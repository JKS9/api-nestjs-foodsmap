import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTagDto {
  @IsMongoId()
  _id: Types.ObjectId;

  @IsString()
  @IsOptional()
  tag?: string;
}
