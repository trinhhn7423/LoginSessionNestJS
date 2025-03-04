import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';

export class OrderItemDto {
    @IsNumber()
    @IsNotEmpty()
    varianId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}