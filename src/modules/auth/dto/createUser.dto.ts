import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
