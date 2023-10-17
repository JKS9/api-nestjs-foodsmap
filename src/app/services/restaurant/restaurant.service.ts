import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateDtoRestaurant } from 'src/common/dto/restaurant/createRestaurant.dto';
import { UpdateDtoRestaurant } from 'src/common/dto/restaurant/updateRestaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,
  ) {}

  async createRestaurant(restaurant: CreateDtoRestaurant, userId: string) {
    restaurant.createdBy = new mongoose.Types.ObjectId(userId);

    try {
      await this.userModel
        .updateOne(
          {
            _id: new mongoose.Types.ObjectId(userId),
          },
          { $inc: { nbRestaurant: 1, nbGrade: 1 } },
        )
        .exec();

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

  async findOneRestaurant(id: string, userId: string) {
    const result = await this.restaurantModel.findById(id).exec();

    if (String(result?.createdBy) != userId) {
      throw new UnauthorizedException("You don't have the permission");
    }

    return result;
  }

  async findAllRestaurnant(userId: string) {
    console.log(userId);
    return await this.restaurantModel.find({
      createdBy: new mongoose.Types.ObjectId(userId),
    });
  }

  async deleteRestaurnant(id: string, userId: string) {
    try {
      await this.restaurantModel
        .findOneAndDelete({
          createdBy: new mongoose.Types.ObjectId(userId),
          _id: new mongoose.Types.ObjectId(id),
        })
        .exec();

      await this.userModel
        .updateOne(
          {
            _id: new mongoose.Types.ObjectId(userId),
          },
          { $inc: { nbRestaurant: -1, nbGrade: -1 } },
        )
        .exec();
      return {
        message: 'Document Delete',
      };
    } catch (e) {
      console.log(e);
      throw new NotFoundException('An unexpected error');
    }
  }
}
