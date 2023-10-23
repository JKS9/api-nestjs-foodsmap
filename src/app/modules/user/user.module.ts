import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'config/env.config';

import { UserController } from 'src/app/controllers/user/user.controller';
import { UserModel } from 'src/app/services/user/schemas/user.schema';
import { UserService } from 'src/app/services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
