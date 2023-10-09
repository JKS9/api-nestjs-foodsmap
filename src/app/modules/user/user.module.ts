import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from 'src/app/controllers/user/user.controller';
import { UserModel } from 'src/app/services/user/schemas/user.schema';
import { UserService } from 'src/app/services/user/user.service';

import { config } from 'config/env.config';

// Define a Nest.js module for handling status-related functionality
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController], // Specify the controllers used in this module
  providers: [UserService], // Specify the services provided by this module
})
export class UserModule {}
