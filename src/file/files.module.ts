import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILES_SERVICE } from 'src/config/service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [FilesController],
  providers: [],
})
export class FilesModule {}
