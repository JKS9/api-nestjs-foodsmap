import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantController } from 'src/app/controllers/restaurant/restaurant.controller';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { RestaurantModel } from 'src/app/services/restaurant/schemas/restaurant.schema';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'config/env.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantModel },
    ]),
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
