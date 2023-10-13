import { IsMongoId } from 'class-validator';

export class FindOneDtoRestaurant {
  @IsMongoId()
  id: string;
}
