import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Restaurant } from './schemas/restaurant.schema';
import { UserService } from '../user/user.service';

import { CreateDtoRestaurant } from 'src/common/dto/restaurant/createRestaurant.dto';
import { UpdateDtoRestaurant } from 'src/common/dto/restaurant/updateRestaurant.dto';

import { IUpdateRestaurant } from 'src/common/typescript/restaurant/restaurant';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async createRestaurant(restaurant: CreateDtoRestaurant, userId: string) {
    restaurant.createdBy = new mongoose.Types.ObjectId(userId);

    try {
      await this.incrementRestauant(userId, 1);

      return await new this.restaurantModel(restaurant).save();
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }

  async updateRestaurant(restaurant: UpdateDtoRestaurant, userId: string) {
    return this.restaurantModel
      .updateOne(
        {
          _id: new mongoose.Types.ObjectId(restaurant._id),
          createdBy: new mongoose.Types.ObjectId(userId),
        },
        restaurant,
      )
      .exec();
  }

  async findOne(id: string, userId: string) {
    return await this.restaurantModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        createdBy: new mongoose.Types.ObjectId(userId),
      })
      .exec();
  }

  async findAllRestaurnant(userId: string) {
    return await this.restaurantModel.find({
      createdBy: userId,
    });
  }

  async deleteRestaurnant(id: string, userId: string) {
    try {
      const result: Object = await this.restaurantModel
        .findOneAndDelete({
          createdBy: new mongoose.Types.ObjectId(userId),
          _id: new mongoose.Types.ObjectId(id),
        })
        .exec();

      if (result) {
        await this.incrementRestauant(userId, -1);
      }

      return {
        message: 'Document Delete',
      };
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }

  private async incrementRestauant(userId: string, nb: number): Promise<void> {
    try {
      const update: IUpdateRestaurant = {
        $inc: { nbRestaurant: nb, nbGrade: nb },
      };
      await this.userService.updateOne({ _id: userId }, update);
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }
}
