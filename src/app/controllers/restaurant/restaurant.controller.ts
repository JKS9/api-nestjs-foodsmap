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

@UseGuards(AuthGuard)
@Controller('/restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  //@UseGuards(AuthGuard)
  async createRestaurant(
    @Req() req: Request,
    @Body() body: CreateDtoRestaurant,
  ) {
    return this.restaurantService.createRestaurant(body, req['user']);
  }

  @Put()
  //@UseGuards(AuthGuard)
  async updateRestaurant(
    @Req() req: Request,
    @Body() body: UpdateDtoRestaurant,
  ) {
    return this.restaurantService.updateRestaurant(body, req['user']);
  }

  @Get('/:id')
  //@UseGuards(AuthGuard)
  async findOneRestaurant(
    @Req() req: Request,
    @Param() params: FindOneDtoRestaurant,
  ) {
    console.log(params);
    return this.restaurantService.findOneRestaurant(params.id, req['user']);
  }

  @Get()
  //@UseGuards(AuthGuard)
  async findAllRestaurnant(@Req() req: Request) {
    return this.restaurantService.findAllRestaurnant(req['user']);
  }

  @Delete('/:id')
  //@UseGuards(AuthGuard)
  async deleteRestaurnant(
    @Req() req: Request,
    @Param() params: FindOneDtoRestaurant,
  ) {
    return this.restaurantService.deleteRestaurnant(params.id, req['user']);
  }
}
