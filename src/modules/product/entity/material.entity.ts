import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { ProductVarianEntity } from "./product_variant.entity";



@Entity({ name: 'material' })
export class MaterialEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToOne(() => ProductEntity, products => products.materials, { onDelete: 'CASCADE' })
    product: ProductEntity;

    @OneToMany(() => ProductVarianEntity, varian => varian.material, { onDelete: 'CASCADE' })
    variants: ProductVarianEntity[];
}