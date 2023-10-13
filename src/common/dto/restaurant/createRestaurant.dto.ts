import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsBoolean,
  Min,
  Max,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateDtoRestaurant {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  photos: string[];

  @IsArray()
  tag: Types.ObjectId[];

  @IsBoolean()
  private: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsObject()
  location: {
    latitude: string;
    longitude: string;
  };

  @IsString()
  address: string;

  @IsOptional()
  @IsMongoId()
  createdBy: Types.ObjectId;
}
