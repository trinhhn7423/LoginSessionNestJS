import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { ProductVarianEntity } from "./product_variant.entity";


@Entity({ name: 'size' })
export class SizeEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => ProductEntity, products => products.sizes, { onDelete: 'CASCADE' })
    product: ProductEntity;

    @OneToMany(() => ProductVarianEntity, productVarian => productVarian.size, { onDelete: 'CASCADE' })
    variants: ProductVarianEntity[];
}