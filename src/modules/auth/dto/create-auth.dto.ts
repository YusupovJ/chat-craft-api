import { IsNumber, IsString } from "class-validator";

export class CreateAuthDto {
  @IsNumber()
  id: number

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  token: string;

  @IsNumber()
  avatar: number;
}
