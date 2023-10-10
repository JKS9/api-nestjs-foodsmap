import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from 'src/app/services/user/schemas/user.schema';

import { UserService } from 'src/app/services/user/user.service';
import { FindUserDto } from 'src/common/dto/user/findOneUser.dto';
import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Define a route handler for GET requests at 'status/V1'
  @Get('/:id')
  @UseGuards(AuthGuard)
  register(@Param() params: FindUserDto): Promise<User> {
    // Delegate the request handling to the StatusService's 'health' method
    return this.userService.findOne(params.id);
  }
}