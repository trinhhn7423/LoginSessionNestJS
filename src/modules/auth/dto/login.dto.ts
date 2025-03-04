import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty({description: 'User email',example: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(6, 20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Password',example: '123123' })

  password: string;
}
