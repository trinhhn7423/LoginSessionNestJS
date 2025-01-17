import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  firstname?: string;
  @IsOptional()
  @IsString()
  lastname?: string;
  updated_at?: Date;
}
