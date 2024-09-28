import { IsString, MinLength } from "class-validator";

export class CreateChatDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  img: string;
}
