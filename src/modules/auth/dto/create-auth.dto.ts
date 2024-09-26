import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EnumGender } from "src/helpers/enums";

export class CreateAuthDto {
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
