import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { HttpExceptionFilter } from './common/HttpExceptionFilter/HttpExceptionFilter ';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(
    session({
      name: 'SESSION_TWICE',
      secret: 'secret',
      resave: false, // Không lưu lại session nếu không thay đổi
      saveUninitialized: false, // Không lưu session trống
      cookie: {
        secure: false,
        httpOnly: false, // Cookie chỉ được gửi qua HTTP
        maxAge: 2000000,
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 7423);
}

bootstrap();
