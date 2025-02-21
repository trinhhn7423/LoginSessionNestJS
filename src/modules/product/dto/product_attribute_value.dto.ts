import { IsNotEmpty, IsString, Length } from 'class-validator';

export class Product_attribute_valueDto {
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  attributeValue: string;

  //
}
