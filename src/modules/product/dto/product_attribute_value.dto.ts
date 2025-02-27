import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class Product_attribute_valueDto {

  // @IsNotEmpty()
  // @Transform(({ value }) => Number(value))
  // @IsNumber()
  // quantity: number;

  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  attributeValue: string;



}
