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
import { OrderEntity } from 'src/modules/order/entities/order.entity';
import { ColorEntity } from './color.entity';
import { SizeEntity } from './size.entity';
import { MaterialEntity } from './material.entity';
import { ProductVarianEntity } from './product_variant.entity';

@Entity('product')
export class ProductEntity extends CommonEntity {
  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ nullable: false })
  skuCode: string; // mã được sử dụng để nhận dạng và theo dõi từng sản phẩm riêng biệt trong kho hàng

  @Column({ nullable: false })
  barCode: string;  // mã quét vạch 

  @Column({ nullable: false })
  unit: string;  // đơn vị tínhh 

  @Column({ nullable: false })
  branch: string;  //nhãn hànghàng

  @Column({ nullable: false })
  description: string;  // chi tiết 

  @Column({ nullable: false })
  sellPrice: number;  // giá bán 

  @Column({ nullable: false })
  comparePrice: number;

  @Column({ nullable: false })
  cost: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => AuthEntity, { onDelete: 'CASCADE' })
  createBy: AuthEntity;

  // Một sp có nhiều màumàu
  @OneToMany(() => ColorEntity, (color) => color.product,)
  colors: ColorEntity[];

  //Một sp có nhiều sizesize
  @OneToMany(() => SizeEntity, (size) => size.product, { onDelete: 'CASCADE' })
  sizes: SizeEntity[];

  //Một sp có nhiều chất liệu 
  @OneToMany(() => MaterialEntity, material => material.product, { onDelete: 'CASCADE' })
  materials: MaterialEntity[];

  //Một sản phẩm có nhiều biến thể 
  @OneToMany(() => ProductVarianEntity, vatrian => vatrian.product)
  variants: ProductVarianEntity[];

}
