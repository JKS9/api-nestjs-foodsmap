import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { FindUserDto } from 'src/common/dto/user/findOneUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(id: string) {
    return this.userModel
      .findById(id)
      .select('-password')
      .populate('friends', '-password -setting')
      .exec();
  }
}
