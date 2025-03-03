import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { ProductVarianEntity } from "./product_variant.entity";


@Entity({ name: 'color' })
export class ColorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ProductEntity, products => products.colors, { onDelete: 'CASCADE', })
    product: ProductEntity;

    @OneToMany(() => ProductVarianEntity, varian => varian.color)
    variants: ProductVarianEntity[];

  
}