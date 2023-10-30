import {
  Controller,
  Post,
  UseGuards,
  Req,
  Param,
  Get,
  Delete,
  Body,
  Patch,
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
  async create(@Req() req: Request, @Body() body: CreateDtoRestaurant) {
    return this.restaurantService.create(body, req['user']);
  }

  @Patch()
  async updateOne(@Req() req: Request, @Body() body: UpdateDtoRestaurant) {
    return this.restaurantService.updateOne(body, req['user']);
  }

  @Get('/:id')
  async findOne(@Req() req: Request, @Param() params: FindOneDtoRestaurant) {
    return this.restaurantService.findOne(params.id, req['user']);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.restaurantService.findAll(req['user']);
  }

  @Delete('/:id')
  async delete(@Req() req: Request, @Param() params: FindOneDtoRestaurant) {
    return this.restaurantService.delete(params.id, req['user']);
  }
}
