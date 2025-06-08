import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { runInitialSeed } from './seed/initial.seed';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Crypto Wallet API') // Your API title
    .setDescription('API documentation for managing crypto and fiat wallets, users, and orders.') // Your API description
    .setVersion('1.0') // API version
    .addBearerAuth( // Add Bearer token authentication option
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' },
      'JWT-auth' // This name is used in the @ApiSecurity() decorator
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get<number>('PORT') || 3000; // Example: get port from config
  await app.listen(port);
  const appUrl = await app.getUrl();
  const displayUrl = appUrl.includes('[::1]')
    ? `http://localhost:${port}` // Manually construct if IPv6 loopback is detected
    : `${appUrl}`; // Otherwise, use the URL provided by app.getUrl()
  
  console.log(`Application is running on: ${displayUrl}/api`);
  console.log(`Swagger UI available at: ${displayUrl}/swagger`);
}
bootstrap();
