/**
 * IMPORT MODULES NEST.JS
 */
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * IMPORT MODULES
 */
import * as figlet from 'figlet';

/**
 * CONFIG DOTENV
 */
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * IMPORT FILES
 */
import { AppModule } from './app/app.module';
import { config } from '../config/env.config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'config/logger.config';
/**
 * START API
 */
async function bootstrap() {
  try {
    // Create an instance of the Nest.js application
    const app: INestApplication<any> = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });

    app.useGlobalPipes(new ValidationPipe());

    // Get the port number from the configuration
    const port: string = config().app.port;

    // Listen to the application on the specified port
    await app.listen(port);

    // Generate ASCII art using figlet
    figlet('Foods Map API', function (err, data) {
      if (err) {
        // If there's an error while generating ASCII art, log an error
        console.error('Error while generating ASCII art:', err);
      } else {
        // Log the ASCII art to the console
        console.log(data);
        console.log(
          '---------------------------------------------------------------------',
        );
      }
    });

    // Display a message indicating that the API is running on the specified port
    console.log(`API is running on port ${port}`);
  } catch (error) {
    // If there's an error while starting the API, log an error
    console.error('Error starting the API:', error);
  }
}

/**
 * Call the bootstrap function to start the application
 */
bootstrap();
