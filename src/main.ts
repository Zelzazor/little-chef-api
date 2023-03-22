import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<string>('APP_PORT');
  await app.listen(APP_PORT || 3000);
}
bootstrap();
