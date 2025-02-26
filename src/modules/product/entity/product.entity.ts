import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Post } from '@nestjs/common';
import { AuthEntity } from '../../auth/auth.entity';
import { ProductAttribute } from './product_attribute.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entity';

@Entity('product')
export class ProductEntity extends CommonEntity {
  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ nullable: false })
  sku_code: string;

  @Column({ nullable: false })
  barcode: string;

  @Column({ nullable: false })
  unit: string;

  @Column({ nullable: false })
  branch: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  sell_price: number;

  @Column({ nullable: false })
  compare_price: number;

  @Column({ nullable: false })
  cost: string;

  @Column({ nullable: true })
  image: string;


  @ManyToOne(() => AuthEntity, { onDelete: 'CASCADE' })
  createBy: AuthEntity;

  @OneToMany(() => ProductAttribute, (attribute) => attribute.product, {
    // trỏ đến thuộc tính product trong ProductAttribute
    // một sản phẩm có nhiều thuộc tính
  })
  attributes: ProductAttribute[];

  // @ManyToOne(() => OrderEntity, (order) => order.product, { onDelete: 'SET NULL' })
  // order: OrderEntity
}
