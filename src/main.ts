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
    credentials: true,
  });
  app.use(cookieParser());



  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const redisClient = createClient({
    socket: {
      host: '127.0.0.1', 
      port: 6379,
    },
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  await redisClient.connect();
  app.use(
    session({
      store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
      name: 'SESSION_TWICE',
      secret: 'secret',
      resave: false, // Không lưu lại session nếu không thay đổi
      saveUninitialized: false, // Không lưu session trống
      cookie: {
        secure: false,
        httpOnly: true, // Cookie chỉ được gửi qua HTTP
        maxAge: 2000000,
        // sameSite: 'none',
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7423);
}

bootstrap();
