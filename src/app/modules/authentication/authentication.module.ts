import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationController } from 'src/app/controllers/authentication/authentication.controller';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TokenModel } from 'src/app/services/authentication/schemas/token.schema';
import { UserModel } from 'src/app/services/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserModel },
      { name: 'Token', schema: TokenModel },
    ]),
  ],
  controllers: [AuthenticationController], // Specify the controllers used in this module
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
