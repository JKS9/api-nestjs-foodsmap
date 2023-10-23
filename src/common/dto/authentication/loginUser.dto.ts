import { IsString, IsEmail } from 'class-validator';

export class loginDtoUser {
  @IsEmail({}, { message: 'The email address is invalid' })
  email: string;

  @IsString()
  password: string;
}
