import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { config } from 'config/env.config';

import { AuthenticationController } from 'src/app/controllers/authentication/authentication.controller';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthenticationController], // Specify the controllers used in this module
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
