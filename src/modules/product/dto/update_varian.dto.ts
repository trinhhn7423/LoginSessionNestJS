import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateVarianDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    skuCode: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    barCode: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    unit: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    sellPrice: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    comparePrice: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    color: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    size: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    material: string;


}