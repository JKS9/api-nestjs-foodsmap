import { IsMongoId } from 'class-validator';

export class FindUserDto {
  @IsMongoId()
  id: string;
}
