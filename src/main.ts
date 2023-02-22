import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { config as s3Config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply prefix for all routes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.setGlobalPrefix('api');
  dotenv.config();

  // Mongoose
  mongoose
    .connect(process.env.URL, { serverSelectionTimeoutMS: 3000 })
    .then((result) => console.log('Database connection Success!'))
    .catch((err) => console.error('Database connection Failed'));

  mongoose.connection.on('connected', () => {
    console.log('Mongodb connected to db!');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', (err) => {
    console.log('Mongodb is disconnected!');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // S3 config
  s3Config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Coffee Coder Management API')
    .setDescription('The Coffee Coder Management APIs description')
    .setVersion('1.0')
    .build();

  console.log('process: ', process.env.APP_PORT);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  console.log(
    `Open http://localhost:${process.env.APP_PORT}/document to see the documentation`,
  );

  await app.listen(process.env.APP_PORT);
}
bootstrap();
