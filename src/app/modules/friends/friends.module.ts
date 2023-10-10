import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { config } from 'config/env.config';

import { FriendsController } from 'src/app/controllers/friends/friends.controller';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UserModel } from 'src/app/services/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
    JwtModule.register({
      global: true,
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [FriendsController], // Specify the controllers used in this module
  providers: [FriendsService],
})
export class FriendsModule {}
