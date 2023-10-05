/**
 * IMPORT MODULES
 */
import {
  Injectable,
  NestMiddleware,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

// Define a log format for Winston
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configuration for the Winston logger
const configLogger = {
  level: 'error', // Log level set to 'error'
  format: winston.format.combine(winston.format.timestamp(), logFormat), // Format includes a timestamp
  transports: [new winston.transports.Console()], // Logs to the console
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = winston.createLogger(configLogger); // Create a logger instance with the defined configuration

  use(req: Request, res: Response, next: NextFunction) {
    // Log an info message for each incoming request
    this.logger.info(`[${req.method}] ${req.url}`);

    next(); // Continue processing the request
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = winston.createLogger(configLogger); // Create a logger instance with the defined configuration

  catch(exception: any, host: ArgumentsHost) {
    // Log an error message for unhandled exceptions
    this.logger.error(
      `Unhandled exception: ${exception.message}`,
      exception.stack,
    );
  }
}
