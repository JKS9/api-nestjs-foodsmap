import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'config/env.config';

import { TagController } from 'src/app/controllers/tag/tag.controller';
import { TagService } from 'src/app/services/tag/tag.service';
import { TagModel } from 'src/app/services/tag/schema/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tag', schema: TagModel }]),
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
