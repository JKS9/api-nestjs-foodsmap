import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../user/schemas/user.schema';
import { CreateUserDto } from 'src/common/dto/user/createUser.dto';
import { loginDtoUser } from 'src/common/dto/authentication/loginUser.dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
} from 'src/common/utils/authentication/authentication';

import { IResultToken } from 'src/common/typescript/authentication/interface';
import { IToken } from 'src/common/typescript/token/token';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async singup(user: CreateUserDto): Promise<IResultToken> {
    const alreadyUser: User = await this.userService.findOne(
      {
        email: user.email,
      },
      'email',
    );

    if (alreadyUser) {
      throw new UnauthorizedException('Email Already used');
    }

    const newUser: User = await this.userService.create(user);

    const accessToken: string = await generateAccessToken(newUser._id);
    const refreshToken: string = await generateRefreshToken();

    const token: IToken = {
      _id: newUser._id,
      accessToken,
      refreshToken,
    };

    if (token.refreshToken && token.accessToken && token._id) {
      await this.tokenService.createOrUpdate(token);
      return {
        token,
        date: new Date(),
      };
    }
  }

  async signin(body: loginDtoUser): Promise<IResultToken> {
    const user: User = await this.userService.findOne(
      {
        email: body.email,
      },
      'email password',
    );

    if (!user) {
      throw new UnauthorizedException('Login failed');
    }

    const compare: boolean = await comparePasswords(
      body.password,
      user.password,
    );

    if (!compare) {
      throw new UnauthorizedException('Login failed: password wrong');
    }

    const accessToken: string = await generateAccessToken(user._id);
    const refreshToken: string = await generateRefreshToken();

    const token: IToken = {
      _id: user._id,
      accessToken,
      refreshToken,
    };

    if (token.refreshToken && token.accessToken && token._id) {
      await this.tokenService.createOrUpdate(token);
      return {
        token,
        date: new Date(),
      };
    }
  }
}
