import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';
import { OrderItemDto } from './create_order_item.dto';
import { Type } from 'class-transformer';


export class UpdateOrderDto {
    // @IsString()
    // @IsNotEmpty()
    // @IsOptional()
    // orderCode: string;

    // @IsString()
    // @IsNotEmpty()
    // @IsOptional()
    // customer: string;

    // @IsNumber()
    // @IsOptional()
    // @IsNotEmpty()
    // price: number;

    // @IsNumber()
    // @IsOptional()
    // @IsNotEmpty()
    // discount: number;

    // @IsString()
    // @IsOptional()
    // @IsNotEmpty()
    // area: string;

    // @IsString()
    // @IsOptional()
    // @IsNotEmpty()
    // address_shipping: string;

    // @IsNumber()
    // @IsOptional()
    // @IsNotEmpty()
    // deliveryCost: number;

    // @IsNumber()
    // @IsOptional()
    // @IsOptional()
    // tax?: number;

    @IsEnum(PaymentStatus)
    @IsOptional()
    @IsNotEmpty()
    paymentStatus: PaymentStatus;

    @IsEnum(OrderStatus)
    @IsOptional()
    @IsNotEmpty()
    orderStatus: OrderStatus;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    paymentMethodId: number;

    // @Type(() => OrderItemDto)
    // @IsNotEmpty()
    // @IsArray()
    // @ValidateNested({ each: true })
    // @ArrayMinSize(1)
    // items: OrderItemDto[];
}

// export class UpdateOrderDto extends CreateOrderDto {
//     @IsOptional()
//     orderCode?: string;
// }
