import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { HttpExceptionFilter } from './common/HttpExceptionFilter/HttpExceptionFilter ';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,

      // whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser());

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
        httpOnly: true, // Cookie chỉ được gửi qua HTTP
        maxAge: 2000000,
        // sameSite: 'none',
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 7423);
}

bootstrap();
