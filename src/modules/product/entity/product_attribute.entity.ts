import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductAttributeValue } from './product_attribute_value.entity';
import { Exclude } from 'class-transformer';

@Entity('product_attribute')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string; // Ví dụ: Kích thước, Màu sắc, Chất liệu

  @OneToMany(() => ProductAttributeValue, (value) => value.attribute, {
    // một thuộc tính có nhiều giá trị
  })
  values: ProductAttributeValue[];

  @Exclude()
  @ManyToOne(() => ProductEntity, (product) => product.attributes, {
    // nhiều thuộc tính cho 1 sản phẩm
    onDelete: 'CASCADE', // khi xóa entity cha entity con cũng bị xóa
  })
  product: ProductEntity;
}
