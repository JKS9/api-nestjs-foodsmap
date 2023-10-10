import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CreateUserDto } from 'src/common/dto/user/createUser.dto';
import { loginDtoUser } from 'src/common/dto/user/loginUser.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto): Promise<object> {
    const token: {
      _id: any;
      accessToken: any;
      refreshToken: any;
    } = await this.authenticationService.register(body);

    if (token.refreshToken && token.accessToken && token._id) {
      await this.authenticationService.token(token);
      return {
        token,
        date: new Date(),
      };
    }
  }

  @Post('/login')
  async login(@Body() body: loginDtoUser): Promise<object> {
    const token: {
      _id: any;
      accessToken: any;
      refreshToken: any;
    } = await this.authenticationService.login(body);

    if (token.refreshToken && token.accessToken && token._id) {
      await this.authenticationService.token(token);
      return {
        token,
        date: new Date(),
      };
    }
  }
}
