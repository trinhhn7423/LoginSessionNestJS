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
import { OrderModule } from './modules/order/order.module';
import { CustomerEntity } from './modules/order/entities/customer.entity';
import { OrderEntity } from './modules/order/entities/order.entity';
import { DataSourceOptions } from 'typeorm';
import dataSource, { dataSourceOptions } from './migrations/dataSource';



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    RoleModule,
    ProductModule,
    OrderModule
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
