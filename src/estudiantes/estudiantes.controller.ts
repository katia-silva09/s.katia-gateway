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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ESTUDIANTES_SERVICE, FILES_SERVICE } from 'src/config/service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';
import { CreateFileDto } from 'src/file/dto/create-file.dto';

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
  @Get(':id/avatar')
  getAvatar(@Param('id', ParseIntPipe) id: number) {
    return this.filesClient.send(
      { cmd: 'get_file_by_model' },
      { model_id: id },
    );
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudianteClient.send({ cmd: 'delete_student' }, { id });
  }

  @Delete(':id/avatar')
  deleteAvatar(@Param('id', ParseIntPipe) id: number) {
    return this.filesClient.send({ cmd: 'delete_by_model' }, { model_id: id });
  }
}
