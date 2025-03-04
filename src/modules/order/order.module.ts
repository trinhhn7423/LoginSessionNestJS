import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './entities/payment_method.entity';
import { OrderItemEntity } from './entities/order_item.entity';
import { ProductVarianEntity } from '../product/entity/product_variant.entity';
import { ProductEntity } from '../product/entity/product.entity';
import { AuthEntity } from '../auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity,
    PaymentMethodEntity,
    OrderItemEntity,
    ProductVarianEntity,
    ProductEntity,
    AuthEntity
  ])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
