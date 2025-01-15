import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // ap.use(cpookieParser('your-secret-key'));
  app.use(
    session({
      name: 'SESSION_ONCE',
      secret: 'secret',
      resave: false, // Không lưu lại session nếu không thay đổi
      saveUninitialized: false, // Không lưu session trống
      cookie: {
        secure: false,
        httpOnly: true, // Cookie chỉ được gửi qua HTTP
        maxAge: 20000,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
