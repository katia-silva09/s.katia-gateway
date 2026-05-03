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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DOCENTES_SERVICE } from 'src/config/service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(
    @Inject(DOCENTES_SERVICE) private readonly docenteClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() docenteDto: CreateDocenteDto) {
    return this.docenteClient.send({ cmd: 'create_docente' }, docenteDto);
  }

  @Get()
  findAll() {
    return this.docenteClient.send({ cmd: 'getAll_docentes' }, {});
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.docenteClient.send({ cmd: 'get_docente_by_id' }, Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteClient.send(
      { cmd: 'update_docente' },
      { id, data: updateDocenteDto },
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.docenteClient.send({ cmd: 'remove_docente' }, id);
  }
}
