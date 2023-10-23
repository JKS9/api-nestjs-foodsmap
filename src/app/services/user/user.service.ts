import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { CreateUserDto } from 'src/common/dto/user/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    return await new this.userModel(user).save();
  }

  async findOne(field: object, select: string): Promise<User> {
    return this.userModel
      .findOne(field)
      .select(select)
      .populate('friends followingYou', '-password -setting')
      .exec();
  }

  async updateOne(criteria: object, updates: object): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate(criteria, updates, {
        new: true,
      })
      .select('-password')
      .populate('friends followingYou', '-password -setting')
      .exec();
  }
}
