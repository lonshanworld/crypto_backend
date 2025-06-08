// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './../app.module';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { runInitialSeed } from './initial.seed';

async function bootstrapSeed() {
  console.log('Starting database seeding...');

 
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = appContext.get(DataSource);
    const configService = appContext.get(ConfigService);

    if (configService.get<string>('NODE_ENV') !== 'production') {
        await runInitialSeed(dataSource);
        console.log('Initial seed completed successfully.');
    } else {
        console.log('Skipping seed in production environment.');
    }

  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1); 
  } finally {
    await appContext.close(); 
    process.exit(0); 
  }
}

bootstrapSeed();