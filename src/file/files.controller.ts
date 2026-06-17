import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILES_SERVICE } from 'src/config/service';
import { CreateFileDto } from './dto/create-file.dto';

type UploadedFileType = {
  mimetype: string;
  originalname: string;
  buffer: Buffer;
};

@Controller('files')
export class FilesController {
  constructor(
    @Inject(FILES_SERVICE)
    private readonly filesClient: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: UploadedFileType,
    @Body('model_id') model_id: string,
  ) {
    const dto: CreateFileDto = {
      model_id: Number(model_id),
      mime: file.mimetype,
      originalName: file.originalname,
      buffer: file.buffer,
    };

    return this.filesClient.send({ cmd: 'create_files' }, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filesClient.send({ cmd: 'get_one_files' }, id);
  }

  @Get()
  findAll() {
    return this.filesClient.send({ cmd: 'get_all_files' }, {});
  }
  @Delete('students/:id')
  deleteByModel(@Param('id', ParseIntPipe) id: number): void {
    this.filesClient.emit({ cmd: 'delete_by_model' }, { model_id: id });
  }
}
