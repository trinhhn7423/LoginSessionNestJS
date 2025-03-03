import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class CreateAttributeDto {

    @IsNumber()
    @IsNotEmpty()
    idProduct: number;

    @IsNotEmpty()
    @IsArray()
    arrColors: string[];

    @IsNotEmpty()
    @IsArray()
    arrSizes: string[];


    @IsArray()
    @IsOptional()
    arrMaterials: string[];
}