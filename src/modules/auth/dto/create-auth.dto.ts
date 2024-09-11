import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EnumGender } from "../entities/auth.entity";

export class CreateAuthDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  username: string;

  @IsEnum(EnumGender)
  @IsOptional()
  gender: EnumGender;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  token: string;

  @IsNumber()
  @IsOptional()
  avatar: number;
}
