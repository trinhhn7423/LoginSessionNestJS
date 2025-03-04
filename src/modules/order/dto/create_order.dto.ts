import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';
import { OrderItemDto } from './create_order_item.dto';
import { Type } from 'class-transformer';


export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    orderCode: string;

    @IsString()
    @IsNotEmpty()
    customer: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    discount: number;


    @IsString()
    @IsNotEmpty()
    area: string;

    @IsString()
    @IsNotEmpty()
    address_shipping: string;

    @IsNumber()
    @IsNotEmpty()
    deliveryCost: number;

    @IsNumber()
    @IsOptional()
    tax: number;

    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    paymentStatus: PaymentStatus;

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    orderStatus: OrderStatus;

    @IsNumber()
    @IsNotEmpty()
    paymentMethodId: number;

    @Type(() => OrderItemDto)
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    items: OrderItemDto[];
}

// export class UpdateOrderDto extends CreateOrderDto {
//     @IsOptional()
//     orderCode?: string;
// }
