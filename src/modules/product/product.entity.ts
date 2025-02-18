import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';

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
  description: string;

  @Column({ nullable: false })
  sell_price: number;

  @Column({ nullable: false })
  compare_price: number;

  @Column({ nullable: false })
  cost: number;

  @Column({ nullable: false })
  image: string[];
}
