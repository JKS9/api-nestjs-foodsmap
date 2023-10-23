import { Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

import { UserService } from '../user/user.service';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class FavorisService {
  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService,
  ) {}

  async addFavoris(userId: string, restaurantId: string) {
    const user = await this.userService.findOne({ _id: userId }, '-password');

    const restaurant = await this.restaurantService.findOne(
      restaurantId,
      userId,
    );

    console.log('restaurant', restaurant);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const restaurantIdString = new mongoose.Types.ObjectId(restaurantId);

    if (!user.favorites.includes(restaurantIdString)) {
      const update = {
        $addToSet: { favorites: restaurantIdString },
      };

      await this.userService.updateOne({ _id: userId }, update);

      await this.incrementFavoris(userId, 1);

      return { status: 201, description: 'Favorite added successfully' };
    }
  }

  async removeFavoris(userId: string, restaurantId: string) {
    const restaurant = await this.restaurantService.findOne(
      restaurantId,
      userId,
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const restaurantIdString = new mongoose.Types.ObjectId(restaurantId);

    const update = {
      $pull: { favorites: restaurantIdString },
    };

    await this.userService.updateOne({ _id: userId }, update);
    await this.incrementFavoris(userId, -1);

    return { status: 204, description: 'Favorite remove successfully' };
  }

  private async incrementFavoris(userId: string, nb: number): Promise<void> {
    try {
      const update = {
        $inc: { nbFavorites: nb },
      };
      await this.userService.updateOne({ _id: userId }, update);
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }
}
