import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { RestaurantModule } from '../restaurant/restaurant.module';

import { config } from 'config/env.config';

import { FavorisController } from 'src/app/controllers/favoris/favoris.controller';
import { FavorisService } from 'src/app/services/favoris/favoris.service';

@Module({
  imports: [
    UserModule,
    RestaurantModule,
    JwtModule.register({
      secret: config().token,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [FavorisController], // Specify the controllers used in this module
  providers: [FavorisService],
})
export class FavorisModule {}
