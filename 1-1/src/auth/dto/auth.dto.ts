import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @IsNotEmpty()
    @Length(8)
    password: string;
}