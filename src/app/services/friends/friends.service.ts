import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

import { UserService } from '../user/user.service';

@Injectable()
export class FriendsService {
  constructor(private readonly userService: UserService) {}

  async addFriend(userId: string, friendId: string): Promise<object> {
    const user = await this.userService.findOne({ _id: userId }, '-password');

    const friend = await this.userService.findOne(
      { _id: friendId },
      '-password',
    );

    if (!user || !friend) {
      throw new NotFoundException('User or friend not found');
    }

    const friendIdString = new mongoose.Types.ObjectId(friendId);

    if (!user.friends.includes(friendIdString)) {
      const update = {
        $addToSet: { friends: friendId },
      };

      await this.userService.updateOne({ _id: userId }, update);

      await this.incrementNbFriend(userId, friendId, 1);
      await this.updateFriendList(userId, friendId, '$addToSet');

      return { status: 201, description: 'Friend added successfully' };
    }

    return { status: 201, description: 'Friend added successfully' };
  }

  async removeFriend(userId: string, friendId: string): Promise<object> {
    const user = await this.userService.findOne({ _id: userId }, '-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const friendIdString = new mongoose.Types.ObjectId(friendId);

    const update = {
      $pull: { friends: friendIdString },
    };

    await this.userService.updateOne({ _id: userId }, update);
    await this.incrementNbFriend(userId, friendId, -1);
    await this.updateFriendList(userId, friendId, '$pull');

    return { status: 204, description: 'Friend remove successfully' };
  }

  private async incrementNbFriend(
    userId: string,
    friendId: string,
    nb: number,
  ): Promise<void> {
    try {
      const updateForUser = { $inc: { nbUserYouFollow: nb } };
      const updateForFriend = { $inc: { nbUserFollowingYou: nb } };

      await Promise.all([
        this.userService.updateOne({ _id: userId }, updateForUser),
        this.userService.updateOne({ _id: friendId }, updateForFriend),
      ]);
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }

  private async updateFriendList(
    userId: string,
    friendId: string,
    operation: '$addToSet' | '$pull',
  ): Promise<void> {
    try {
      const userIdObj = new mongoose.Types.ObjectId(userId);
      const update = {
        [operation]: { followingYou: userIdObj },
      };

      await this.userService.updateOne({ _id: friendId }, update);
    } catch (e) {
      console.error(e);
      throw new NotFoundException('An unexpected error');
    }
  }
}
