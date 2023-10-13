import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from 'config/env.config';

import { RestaurantController } from 'src/app/controllers/restaurant/restaurant.controller';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { RestaurantModel } from 'src/app/services/restaurant/schemas/restaurant.schema';
import { UserModel } from 'src/app/services/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantModel },
      { name: 'User', schema: UserModel },
    ]),
    JwtModule.register({
      global: true,
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
