import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductAttribute } from './product_attribute.entity';

@Entity('product_attribute_value')
export class ProductAttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  value: string; // Ví dụ: S, M, L, Đỏ, Trắng, Xanh, F1, F2

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => ProductAttribute, (attribute) => attribute.values, {
    // nhiều giá trị của một thuộc tính
    onDelete: 'CASCADE', // khi xóa entity cha entity con cũng bị xóa  (cấp độ sql)
  })
  attribute: ProductAttribute;
}
