import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';

import { User } from '../user/schemas/user.schema';
import { CreateUserDto } from 'src/common/dto/user/createUser.dto';
import { loginDtoUser } from 'src/common/dto/user/loginUser.dto';
import { Token } from './schemas/token.schema';
import { config } from 'config/env.config';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Token') private tokenModel: Model<Token>,
  ) {}

  async register(user: CreateUserDto): Promise<{
    _id: any;
    accessToken: any;
    refreshToken: any;
  }> {
    const alreadyUser: User[] = await this.findOneUser(user);
    if (alreadyUser.length) {
      throw new UnauthorizedException('Email Already used');
    }

    const newUser = await new this.userModel(user).save();
    const accessToken: string = this.generateAccessToken(newUser._id);
    const refreshToken: string = this.generateRefreshToken();

    return {
      _id: newUser._id,
      accessToken,
      refreshToken,
    };
  }

  async login(body: loginDtoUser): Promise<{
    _id: any;
    accessToken: any;
    refreshToken: any;
  }> {
    const user: User[] = await this.findOneUser(body);
    if (!user) {
      throw new UnauthorizedException('Login failed');
    }

    const compare: boolean = await this.comparePasswords(
      body.password,
      user[0].password,
    );
    if (!compare) {
      throw new UnauthorizedException('Login failed: password wrong');
    }

    const accessToken: string = this.generateAccessToken(user[0]._id);
    const refreshToken: string = this.generateRefreshToken();

    return {
      _id: user[0]._id,
      accessToken,
      refreshToken,
    };
  }

  async token(token: any): Promise<Token> {
    return this.tokenModel
      .findOneAndUpdate(
        { user_id: token._id },
        {
          user_id: token._id,
          token: token.refreshToken,
          revoked: false,
          createdAt: new Date(),
        },
        { upsert: true, new: true },
      )
      .exec();
  }

  async findOneUser(user: loginDtoUser): Promise<User[]> {
    return await this.userModel.find({ email: user.email }).exec();
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }

  private generateAccessToken(userId: number): string {
    return jwt.sign({ userId: userId }, config().token, {
      expiresIn: 3600,
    });
  }

  private generateRefreshToken(): string {
    return uuid.v4();
  }
}
