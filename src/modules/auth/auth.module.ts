import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { AuthMiddleware } from './auth.middleware';
import { RoleEntity } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity, RoleEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'auth/users',
        method: RequestMethod.GET,
      },
      {
        path: 'auth/edit/:id',
        method: RequestMethod.POST,
      },
      {
        path: 'auth/delete/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
