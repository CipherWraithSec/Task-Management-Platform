import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  // Create the Nest application
  const app = await NestFactory.create(AppModule);

  // Set up global middleware
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Start the application
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
