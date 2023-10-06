import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  avatar: string;

  @IsString()
  pseudo: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsObject()
  setting: {
    notifications: {
      newRestaurantFriend: boolean;
      gradeRestaurant: boolean;
      newUser: boolean;
      updateFoodsmap: boolean;
      classicNews: boolean;
    };
    darkMode: boolean;
    private: boolean;
    language: string;
  };

  @IsOptional()
  @IsNumber()
  nbFavorites: number;

  @IsOptional()
  @IsNumber()
  nbRestaurant: number;

  @IsOptional()
  @IsNumber()
  nbGrade: number;

  @IsOptional()
  @IsNumber()
  averageGrades: number;

  @IsOptional()
  @IsNumber()
  nbUserFollowingYou: number;

  @IsOptional()
  @IsNumber()
  nbUserYouFollow: number;

  @IsOptional()
  @IsObject()
  friends: Types.ObjectId[];
}
