import { Controller, Post, Body } from '@nestjs/common';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { CreateUserDto } from 'src/common/dto/user/createUser.dto';
import { loginDtoUser } from 'src/common/dto/authentication/loginUser.dto';

import { IResultToken } from 'src/common/typescript/authentication/interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  async singup(@Body() body: CreateUserDto): Promise<IResultToken> {
    return await this.authenticationService.singup(body);
  }

  @Post('/login')
  async signin(@Body() body: loginDtoUser): Promise<IResultToken> {
    return await this.authenticationService.signin(body);
  }
}
