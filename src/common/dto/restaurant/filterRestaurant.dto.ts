import {
  IsOptional,
  IsNumber,
  IsObject,
  Min,
  Max,
  IsArray,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class FilterDtoRestaurant {
  @IsOptional()
  @IsString()
  tags: Types.ObjectId;

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
}
