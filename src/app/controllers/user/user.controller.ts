import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/services/user/schemas/user.schema';

import { FindUserDto } from 'src/common/dto/user/findOneUser.dto';

import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Define a route handler for GET requests at 'status/V1'
  @Get('/:id')
  find(@Param() params: FindUserDto): Promise<User> {
    // Delegate the request handling to the StatusService's 'health' method
    return this.userService.findOne({ _id: params.id }, '-password');
  }
}
