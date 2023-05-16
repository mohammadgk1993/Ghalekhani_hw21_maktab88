import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class optionalInfoUpdate {
  @IsString()
  name?: string;

  @IsString()
  password?: string;

  @IsEmail()
  email?: string;
}


export class UpdateUserDto extends PartialType(optionalInfoUpdate) {}