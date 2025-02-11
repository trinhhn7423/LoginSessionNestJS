import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthEntity } from './modules/auth/auth.entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RoleModule } from './modules/role/role.module';
import { RoleEntity } from './modules/role/role.entity';

const typeOrmOption: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  entities: [AuthEntity, RoleEntity],
  synchronize: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOption),
    AuthModule,
    RoleModule,
    // EmployeeModule,
    // ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
