import { Injectable } from '@nestjs/common';

const dateStart: Date = new Date();

@Injectable()
export class StatusService {
  health() {
    return {
      version: 'V1',
      started: dateStart.toISOString(),
    };
  }
}
