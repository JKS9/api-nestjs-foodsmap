import { Controller, Get } from '@nestjs/common';
import { StatusService } from 'src/app/services/status/status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('V1')
  health(): any {
    return this.statusService.health();
  }
}
