import {
  Controller,
  Delete,
  Param,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';

import { FriendsService } from 'src/app/services/friends/friends.service';
import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

@Controller('/friends')
@UseGuards(AuthGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('add/:friendId')
  async addFriend(
    @Req() req: Request,
    @Param('friendId') friendId: string,
  ): Promise<object> {
    return this.friendsService.addFriend(req['user'], friendId);
  }

  @Delete('remove/:friendId')
  async removeFriend(
    @Req() req: Request,
    @Param('friendId') friendId: string,
  ): Promise<object> {
    return this.friendsService.removeFriend(req['user'], friendId);
  }
}
