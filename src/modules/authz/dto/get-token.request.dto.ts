import { IsEmail, IsString } from 'class-validator';

export class GetTokenRequestDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
