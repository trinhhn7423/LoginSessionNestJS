import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product_attributeDto } from './product_attribute.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku_code: string;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  sell_price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  compare_price: number;

  @IsString()
  @IsNotEmpty()
  cost: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Product_attributeDto)
  attributes: Product_attributeDto[];
}
