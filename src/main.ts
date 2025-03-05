import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { HttpExceptionFilter } from './common/HttpExceptionFilter/HttpExceptionFilter ';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    // origin: '*',
    // credentials: true,
  });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('My app')
    .setDescription('API description')
    .setVersion('1.0')

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // const redisClient = createClient({
  //   socket: {
  //     host: '127.0.0.1',
  //     port: 6379,
  //   },
  // });

  // redisClient.on('error', (err) => console.error('Redis Client Error', err));

  // await redisClient.connect();
  app.use(
    session({
      // store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
      name: 'SESSION_TWICE',
      secret: 'secret',
      resave: false, // Không lưu lại session nếu không thay đổi
      saveUninitialized: false, // Không lưu session trống
      cookie: {
        secure: false,
        httpOnly: false, // Cookie chỉ được gửi qua HTTP
        maxAge: 20 * 60 * 1000, // Thời gian sống của cookie
        sameSite: 'none',
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7423);
}

bootstrap();
