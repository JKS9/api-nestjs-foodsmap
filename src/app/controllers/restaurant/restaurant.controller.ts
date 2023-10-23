import {
  Controller,
  Post,
  UseGuards,
  Req,
  Param,
  Get,
  Delete,
  Body,
  Put,
} from '@nestjs/common';

import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { CreateDtoRestaurant } from 'src/common/dto/restaurant/createRestaurant.dto';
import { FindOneDtoRestaurant } from 'src/common/dto/restaurant/findOneRestaurant.dto';
import { UpdateDtoRestaurant } from 'src/common/dto/restaurant/updateRestaurant.dto';

import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

@Controller('/restaurant')
@UseGuards(AuthGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(
    @Req() req: Request,
    @Body() body: CreateDtoRestaurant,
  ) {
    return this.restaurantService.createRestaurant(body, req['user']);
  }

  @Put()
  async updateRestaurant(
    @Req() req: Request,
    @Body() body: UpdateDtoRestaurant,
  ) {
    return this.restaurantService.updateRestaurant(body, req['user']);
  }

  @Get('/:id')
  async findOneRestaurant(
    @Req() req: Request,
    @Param() params: FindOneDtoRestaurant,
  ) {
    return this.restaurantService.findOne(params.id, req['user']);
  }

  @Get()
  async findAllRestaurnant(@Req() req: Request) {
    return this.restaurantService.findAllRestaurnant(req['user']);
  }

  @Delete('/:id')
  async deleteRestaurnant(
    @Req() req: Request,
    @Param() params: FindOneDtoRestaurant,
  ) {
    return this.restaurantService.deleteRestaurnant(params.id, req['user']);
  }
}
