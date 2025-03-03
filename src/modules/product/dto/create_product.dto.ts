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

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  skuCode: string;

  @IsString()
  @IsNotEmpty()
  barCode: string;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  sellPrice: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  comparePrice: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

}
