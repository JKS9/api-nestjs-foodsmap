import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import mongoose, { Model } from 'mongoose';

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

    const friendIdString: string = friendId.toString();

    if (!user.friends.includes(new mongoose.Types.ObjectId(friendIdString))) {
      user.friends.push(new mongoose.Types.ObjectId(friendIdString));
      await user.save();
      await this.incrementNbFriend(userId, friendId, 1);
      await this.incrementFriend(userId, friendId);

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

    const friendIdString: string = friendId.toString();

    const index = user.friends.indexOf(
      new mongoose.Types.ObjectId(friendIdString),
    );

    if (index !== -1) {
      user.friends.splice(index, 1);
      await user.save();
      await this.incrementNbFriend(userId, friendId, -1);
      await this.incrementDeleteFriend(userId, friendId);

      return { status: 204, description: 'Friend remove successfully' };
    }

    return { status: 204, description: 'Friend remove successfully' };
  }

  private async incrementNbFriend(
    userId: string,
    friendId: string,
    add: number,
  ) {
    try {
      await this.userModel
        .updateOne(
          {
            _id: new mongoose.Types.ObjectId(userId),
          },
          { $inc: { nbUserYouFollow: add } },
        )
        .exec();

      await this.userModel
        .updateOne(
          {
            _id: new mongoose.Types.ObjectId(friendId),
          },
          { $inc: { nbUserFollowingYou: add } },
        )
        .exec();
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }

  private async incrementFriend(userId: string, friendId: string) {
    try {
      const user = await this.userModel
        .findById(friendId)
        .select('-password')
        .exec();

      if (!user.followingYou.includes(new mongoose.Types.ObjectId(userId))) {
        user.followingYou.push(new mongoose.Types.ObjectId(userId));
        await user.save();
      }
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }

  private async incrementDeleteFriend(userId: string, friendId: string) {
    try {
      const user = await this.userModel
        .findById(friendId)
        .select('-password')
        .exec();

      const userIdString: string = userId.toString();

      const index = user.followingYou.indexOf(
        new mongoose.Types.ObjectId(userIdString),
      );

      if (index !== -1) {
        user.followingYou.splice(index, 1);
        await user.save();
      }
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }
}
