import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  token: string;

  @IsNumber()
  @IsOptional()
  avatar: number;
}
