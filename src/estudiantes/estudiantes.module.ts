import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ESTUDIANTES_SERVICE, FILES_SERVICE } from 'src/config/service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ESTUDIANTES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.ESTUDIANTES_SERVICE_HOST,
          port: Number(process.env.ESTUDIANTES_SERVICE_PORT),
        },
      },
      {
        name: FILES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.FILES_SERVICE_HOST,
          port: Number(process.env.FILES_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [EstudiantesController],
  providers: [],
})
export class EstudiantesModule {}
