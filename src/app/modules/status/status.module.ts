import { Module } from '@nestjs/common';
import { StatusController } from 'src/app/controllers/status/status.controller';
import { StatusService } from 'src/app/services/status/status.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
