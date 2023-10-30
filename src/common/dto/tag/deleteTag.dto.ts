import { IsMongoId } from 'class-validator';

export class DeletetagDto {
  @IsMongoId()
  id: string;
}
