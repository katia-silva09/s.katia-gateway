import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { DocentesModule } from './docentes/docentes.Module';
import { FilesModule } from './file/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EstudiantesModule,
    DocentesModule,
    FilesModule,
  ],
})
export class AppModule {}
