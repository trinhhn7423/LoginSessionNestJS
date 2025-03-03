import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVarianDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    idProduct: number;

    @IsNotEmpty()
    @IsString()
    skuCode: string;

    @IsNotEmpty()
    @IsString()
    barCode: string;

    @IsNotEmpty()
    @IsString()
    unit: string;

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

    @IsNotEmpty()
    @IsString()
    color: string;

    @IsNotEmpty()
    @IsString()
    size: string;

    @IsNotEmpty()
    @IsString()
    // @IsOptional()
    material: string;
}