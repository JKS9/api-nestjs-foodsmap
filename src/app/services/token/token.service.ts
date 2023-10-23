import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Token } from './schemas/token.schema';

import { IToken } from 'src/common/typescript/token/token';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {}

  async createOrUpdate(token: IToken) {
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
}
