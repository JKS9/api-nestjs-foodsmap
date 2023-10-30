import { IsNotEmpty, IsMongoId, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDtoTag {
  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  createdBy: Types.ObjectId;
}
