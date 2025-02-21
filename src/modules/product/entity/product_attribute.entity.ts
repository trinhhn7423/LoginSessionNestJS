import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductAttributeValue } from './product_attribute_value.entity';

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

  @ManyToOne(() => ProductEntity, (product) => product.attributes, {
    // nhiều thuộc tính cho 1 sản phẩm
    onDelete: 'CASCADE', // khi xóa entity cha entity con cũng bị xóa
  })
  product: ProductEntity;
}
