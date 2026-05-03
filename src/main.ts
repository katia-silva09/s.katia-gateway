import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3004',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);

  logger.log(
    `Microservicio de client corriendo en el puerto ${process.env.PORT}`,
  );
}
bootstrap();
