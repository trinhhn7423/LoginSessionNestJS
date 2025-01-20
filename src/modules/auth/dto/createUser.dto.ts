import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Mật khẩu ít nhất 6 ký tự
  @MaxLength(30)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastname: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
