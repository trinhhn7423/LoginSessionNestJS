import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 30)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Mật khẩu ít nhất 6 ký tự
  @MaxLength(30)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  fullname: string;

  // @IsString()
  // @IsOptional()
  // @IsNotEmpty()
  // @MinLength(6)
  // @MaxLength(20)
  // phone?: string;
}
