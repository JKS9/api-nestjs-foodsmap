import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from 'src/app/services/status/status.service';
import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

// Define a controller for handling status-related requests
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  // Define a route handler for GET requests at 'status/V1'
  @Get('V1')
  health(): any {
    // Delegate the request handling to the StatusService's 'health' method
    return this.statusService.health();
  }
}
