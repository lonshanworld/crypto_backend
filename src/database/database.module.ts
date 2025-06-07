// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Required to inject ConfigService
      useFactory: (configService: ConfigService) => {
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<string>('DB_PORT');
        const dbUsername = configService.get<string>('DB_USERNAME');
        const dbPassword = configService.get<string>('DB_PASSWORD');
        const dbDatabase = configService.get<string>('DB_DATABASE');

        if (!dbHost || !dbPort || !dbUsername || !dbPassword || !dbDatabase) {
          // Log error and throw if critical env vars are missing
          console.error('Database environment variables are not fully set.');
          throw new Error('Database configuration missing. Please check .env file.');
        }

        return {
          type: 'mysql',
          host: dbHost,
          port: parseInt(dbPort, 10),
          username: dbUsername,
          password: dbPassword,
          database: dbDatabase,
          // List ALL your entity classes explicitly here:
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
          // This is generally true only for development. Set to false in production.
          synchronize: true,
          logging: ['query', 'error'], // Good for debugging
        };
      },
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  // Export TypeOrmModule so other modules can use .forFeature()
  exports: [TypeOrmModule],
})
export class DatabaseModule {}