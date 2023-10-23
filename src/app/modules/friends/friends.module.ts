import { Module } from '@nestjs/common';

import { FriendsController } from 'src/app/controllers/friends/friends.controller';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'config/env.config';

@Module({
  imports: [
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [FriendsController], // Specify the controllers used in this module
  providers: [FriendsService],
})
export class FriendsModule {}
