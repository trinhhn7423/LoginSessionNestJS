import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class Update_productDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sku_code: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  unit: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  sell_price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  compare_price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  cost: number;

  @Column({ nullable: false })
  quantity: number;

}
