import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CreateUserDto } from 'src/common/dto/user/createUser.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // Define a route handler for GET requests at 'status/V1'
  @Post('/register')
  health(@Body() createUserDto: CreateUserDto): any {
    // Delegate the request handling to the StatusService's 'health' method
    return this.authenticationService.register(createUserDto);
  }
}
