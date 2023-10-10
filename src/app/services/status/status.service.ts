import { Injectable } from '@nestjs/common';

// Create a constant 'dateStart' and set it to the current date and time
const dateStart: Date = new Date();

// Create a service called 'StatusService' that can be injected into other components
@Injectable()
export class StatusService {
  // Define a method 'health' that returns an object with version and start time information
  health(): object {
    return {
      version: 'V1', // Version information
      started: dateStart.toISOString(), // The ISO string representation of the start time
    };
  }
}
