import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsObject,
  MinLength,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  avatar: string;

  @IsString()
  pseudo: string;

  @IsEmail({}, { message: 'The email address is invalid' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password must meet stricter complexity criteria',
  })
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
  @IsObject()
  favorites: Types.ObjectId[];

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

  @IsOptional()
  @IsObject()
  FollowingYou: Types.ObjectId[];
}
