import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import mongoose, { Model, ObjectId } from 'mongoose';

@Injectable()
export class FriendsService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async addFriend(userId: string, friendId: string): Promise<object> {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();
    const friend = await this.userModel
      .findById(friendId)
      .select('-password')
      .exec();

    if (!user || !friend) {
      throw new NotFoundException('User or friend not found');
    }

    const friendIdString = friendId.toString();

    if (!user.friends.includes(new mongoose.Types.ObjectId(friendIdString))) {
      user.friends.push(new mongoose.Types.ObjectId(friendIdString));
      await user.save();
      return { status: 201, description: 'Friend added successfully' };
    }

    return { status: 201, description: 'Friend added successfully' };
  }

  async removeFriend(userId: string, friendId: string): Promise<object> {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const friendIdString = friendId.toString();

    const index = user.friends.indexOf(
      new mongoose.Types.ObjectId(friendIdString),
    );

    if (index !== -1) {
      user.friends.splice(index, 1);
      await user.save();
      return { status: 204, description: 'Friend remove successfully' };
    }

    return { status: 204, description: 'Friend remove successfully' };
  }
}
