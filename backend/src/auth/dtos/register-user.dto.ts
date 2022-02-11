import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;
}
