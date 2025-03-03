import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CommonEntity } from 'src/common/entity/common.entity';
import { ColorEntity } from './color.entity';
import { SizeEntity } from './size.entity';
import { MaterialEntity } from './material.entity';

@Entity({ name: 'product_variant' })
export class ProductVarianEntity extends CommonEntity {


  /// một sản phẩm có nhiều phiên bản
  // ví dụ phiên bản của sản phẩm a có giá là 120.000
  @Column()
  skuCode: string;

  @Column()
  barCode: string;

  @Column()
  unit: string;

  @Column()
  sellPrice: number;

  @Column()
  comparePrice: number;

  @Column()
  cost: number;  // giá vốn 

  @Column()
  quantity: number;

  @Column({ nullable: true })
  image: string

  // Nhiều biến thể liên kết tới 1 sản phẩm 
  @ManyToOne(() => ProductEntity, (product) => product.variants, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @ManyToOne(() => ColorEntity, color => color.variants, { onDelete: 'CASCADE' })
  @JoinColumn()
  color: ColorEntity;

  @ManyToOne(() => SizeEntity, size => size.variants, { onDelete: 'CASCADE' })
  @JoinColumn()
  size: SizeEntity;

  @ManyToOne(() => MaterialEntity, material => material.variants, { onDelete: 'CASCADE' })
  @JoinColumn()
  material: MaterialEntity;


}
