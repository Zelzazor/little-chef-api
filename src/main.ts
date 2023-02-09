import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<string>('APP_PORT');
  await app.listen(APP_PORT || 3000);
}
bootstrap();
