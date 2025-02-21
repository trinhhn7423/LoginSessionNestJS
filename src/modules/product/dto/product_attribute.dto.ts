import {
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Product_attribute_valueDto } from './product_attribute_value.dto';
import { Type } from 'class-transformer';

export class Product_attributeDto {
  @IsString()
  @Length(6, 30)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Product_attribute_valueDto)
  attribute: Product_attribute_valueDto[];
}
