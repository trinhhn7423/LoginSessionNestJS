import { ProductEntity } from 'src/modules/product/entity/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductVarianEntity } from 'src/modules/product/entity/product_variant.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
    order: OrderEntity;

    @ManyToOne(() => ProductVarianEntity)
    varian: ProductVarianEntity;

    @Column({ type: 'int', nullable: false })
    quantity: number; 
}
