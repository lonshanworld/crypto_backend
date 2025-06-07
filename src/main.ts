import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { runInitialSeed } from './seed/initial.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService); // Get ConfigService instance


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not defined in DTO
      forbidNonWhitelisted: true, // Throws error for non-whitelisted properties
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );

  // --- Seeding for Development (Optional, remove in production) ---
  // Only run seeding if in development environment or a specific flag is set
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const dataSource = app.get(DataSource); // Get the TypeORM DataSource
    await runInitialSeed(dataSource); // Run the seed function
    console.log('Development seeding complete.');
  }
}
bootstrap();
