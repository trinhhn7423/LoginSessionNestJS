import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payment_method' })
export class PaymentMethodEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
}