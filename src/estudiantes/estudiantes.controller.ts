import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ESTUDIANTES_SERVICE, FILES_SERVICE } from 'src/config/service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { FileContentDto, FileMetaDto } from 'src/file/dto/response-file';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(
    @Inject(ESTUDIANTES_SERVICE) private readonly estudianteClient: ClientProxy,
    @Inject(FILES_SERVICE)
    private readonly filesClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() estudianteDto: CreateEstudianteDto) {
    return this.estudianteClient.send({ cmd: 'create_student' }, estudianteDto);
  }

  @Get()
  findAll() {
    return this.estudianteClient.send({ cmd: 'get_all_students' }, {});
  }
  @Get(':id/avatar')
  async getAvatar(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const meta = await firstValueFrom<FileMetaDto>(
      this.filesClient.send({ cmd: 'get_file_by_model' }, { model_id: id }),
    );

    if (!meta?.file_name) {
      return res.status(404).json({ message: 'Avatar not found' });
    }

    const file = await firstValueFrom<FileContentDto>(
      this.filesClient.send({ cmd: 'get_file_by_name' }, meta.file_name),
    );

    if (!file?.file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const buffer = Buffer.from(file.file, 'base64');

    res.setHeader('Content-Type', file.mime);
    return res.send(buffer);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estudianteClient.send({ cmd: 'get_student_by_id' }, { id });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateestudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudianteClient.send(
      { cmd: 'update_student' },
      {
        id,
        updateestudianteDto,
      },
    );
  }
  @Put(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await firstValueFrom<CreateFileDto>(
      this.filesClient.send(
        { cmd: 'upsert_student_avatar' },
        {
          model_id: id,
          mime: file.mimetype,
          originalName: file.originalname,
          buffer: file.buffer,
        },
      ),
    );
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await firstValueFrom<void>(
      this.filesClient.send<void>({ cmd: 'delete_by_model' }, { model_id: id }),
    );

    return firstValueFrom<void>(
      this.estudianteClient.send<void>({ cmd: 'delete_student' }, { id }),
    );
  }
}
