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

export class UpdateDtoRestaurant {
  @IsMongoId()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  photos: string[];

  @IsOptional()
  @IsArray()
  tag: Types.ObjectId[];

  @IsOptional()
  @IsBoolean()
  private: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsObject()
  location: {
    latitude: string;
    longitude: string;
  };

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsMongoId()
  createdBy: Types.ObjectId;
}
