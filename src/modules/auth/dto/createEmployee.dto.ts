import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../auth.entity';

export class CreateEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 30)
  email?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  address?: string;

  @IsNumber()
  @IsNotEmpty()
  id_role: number;

  @IsNumber()
  status: UserStatus;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // @MinLength(6)
  // @MaxLength(20)
  // phone?: string;
}
