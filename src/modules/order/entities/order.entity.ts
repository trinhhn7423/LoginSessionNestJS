import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AuthEntity } from '../../auth/auth.entity';
import { ProductEntity } from '../../product/entity/product.entity';
import { PaymentMethodEntity } from './payment_method.entity';
import { OrderItemEntity } from './order_item.entity';
import { Transform, TransformFnParams } from 'class-transformer';



export enum PaymentStatus {
    PAID, // đãđã thanh toán
    UNPAID // chưa thanh toántoán
}

export enum OrderStatus {
    TRANSACTION, // đang giao hàng
    STORAGE, // đang lưu kho
    CANCEL // đã hủy
}
export enum DeliveryStatus {
    PUSH_THROUGH_CARIER,// ĐẨY CHO HÃNG VẬN CHUYỂN 
    DELIVERED, // đã giao hàng
    DELIVERY_AFTER
}


@Entity({ name: 'order' })
export class OrderEntity extends CommonEntity {

    @Column({ nullable: false })
    orderCode: string

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    discount: number

    @Column({ nullable: false })
    customer: string

    @Column({ nullable: false })
    address_shipping: string

    @Column({ nullable: false })
    area: string

    @ManyToOne(() => AuthEntity, { onDelete: 'CASCADE' })
    createBy: AuthEntity;

    @Column({ nullable: false })
    deliveryCost: number //phí vận chuyển 

    @Column({ nullable: true })
    tax: number // phí thuế 

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { cascade: true })
    items: OrderItemEntity[];

    @Column({ nullable: false, type: 'enum', enum: PaymentStatus })
    @Transform(
        ({ value }: TransformFnParams) => {
            if (value === null) return null;
            return `${PaymentStatus[value]?.toLowerCase()}`;
        },
        {
            toPlainOnly: true, //biến đổi khi chuyển từ class sang object ,    ,,instanceToPlain
            toClassOnly: false, // biến đổi từ object sang class ,, plainToInstance
        },
    )
    payment: PaymentStatus //trạng thái thanh toán 

    @Column({ nullable: false, type: 'enum', enum: OrderStatus })
    @Transform(
        ({ value }: TransformFnParams) => {
            if (value === null) return null;
            return `${OrderStatus[value]?.toLowerCase()}`;
        },
        {
            toPlainOnly: true, //biến đổi khi chuyển từ class sang object ,    ,,instanceToPlain
            toClassOnly: false, // biến đổi từ object sang class ,, plainToInstance
        },
    )
    orderStatus: OrderStatus // trạng thái đơn hàng

    @ManyToOne(() => PaymentMethodEntity)
    paymentMethod: PaymentMethodEntity


}
