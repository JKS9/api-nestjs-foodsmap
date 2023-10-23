import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenModel } from 'src/app/services/token/schemas/token.schema';

import { TokenService } from 'src/app/services/token/token.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Token', schema: TokenModel }])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
