import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthEntity } from './modules/auth/auth.entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RoleModule } from './modules/role/role.module';
import { RoleEntity } from './modules/role/role.entity';
import { ProductModule } from './modules/product/product.module';
import { ProductEntity } from './modules/product/entity/product.entity';
import { ProductAttribute } from './modules/product/entity/product_attribute.entity';
import { ProductAttributeValue } from './modules/product/entity/product_attribute_value.entity';

const typeOrmOption: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  entities: [
    AuthEntity,
    RoleEntity,
    ProductEntity,
    ProductAttribute,
    ProductAttributeValue,
  ],
  synchronize: false,
  // logging: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOption),
    AuthModule,
    RoleModule,
    ProductModule,
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
