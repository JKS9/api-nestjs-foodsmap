import {
  Controller,
  Delete,
  Param,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { FavorisService } from 'src/app/services/favoris/favoris.service';

import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

@Controller('/favoris')
@UseGuards(AuthGuard)
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @Post('/add/:restaurantId')
  async addFavoris(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.favorisService.addFavoris(req['user'], restaurantId);
  }

  @Delete('/remove/:restaurantId')
  async removeFavoris(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: string,
  ) {
    return this.favorisService.removeFavoris(req['user'], restaurantId);
  }
}
