import { Module } from '@nestjs/common';
import { StatusController } from 'src/app/controllers/status/status.controller';
import { StatusService } from 'src/app/services/status/status.service';

// Define a Nest.js module for handling status-related functionality
@Module({
  controllers: [StatusController], // Specify the controllers used in this module
  providers: [StatusService], // Specify the services provided by this module
})
export class StatusModule {}
