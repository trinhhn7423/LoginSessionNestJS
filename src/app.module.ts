import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RoleModule } from './modules/role/role.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { dataSourceOptions } from '../db/dataSource';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisStore } from 'connect-redis';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            // new Keyv({
            //   store: new CacheableMemory({ ttl: 6000, lruSize: 5000 }),
            // }),
            createKeyv('redis://127.0.0.1:6379'),
          ],
        };
      },
      isGlobal: true,
    }),

    AuthModule,
    RoleModule,
    ProductModule,
    OrderModule,
    // EmployeeModule,
    // ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
