import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserStatus } from '../auth.entity';
import { Transform, TransformFnParams } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class EditEmployeeDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(6, 20)
  phone: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  // @Length(6, 20)
  fullname: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  // @Length(6, 20)
  address: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  role: number;

  @IsOptional()
  // @IsString()
  // @Transform(({ value }: TransformFnParams) => {
  //   if (!value) return null;
  //   const statusTransform = UserStatus[value?.toLocaleUpperCase()];
  //   console.log('statusTransform', statusTransform);
  //   if (statusTransform) return statusTransform;
  //   else throw new BadRequestException(`Invalid status type: ${value}`);
  // })
  status: UserStatus;
}
