import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AuthEntity } from '../../auth/auth.entity';
import { ProductEntity } from '../../product/entity/product.entity';
import { CustomerEntity } from './customer.entity';



export enum PaymentStatus {
    PAID, // đãđã thanh toán
    UNPAID // chưa thanh toántoán
}

export enum OrderStatus {
    TRANSACTION, // đang giao hàng
    STORAGE, // đang lưu kho
    CANCEL // đã hủy
}


@Entity({ name: 'order' })
export class OrderEntity extends CommonEntity {

    @Column({ nullable: false })
    orderCode: string

    @ManyToOne(() => CustomerEntity, { onDelete: 'SET NULL' })
    @JoinColumn()
    customer: CustomerEntity

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    discount: number

    @Column({ nullable: false })
    deliveryCost: number

    @ManyToMany(() => ProductEntity)
    product: ProductEntity[]

    @Column({ nullable: false, type: 'enum', enum: PaymentStatus })
    payment: PaymentStatus

    @Column({ nullable: false, type: 'enum', enum: OrderStatus })
    orderStatus: OrderStatus

}
