import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StatusModule } from './modules/status/status.module';
import { LoggerMiddleware } from 'config/logger.config';

// Define the main application module called 'AppModule'
@Module({
  imports: [StatusModule], // Import the 'StatusModule' into this module
})
export class AppModule {
  // Configure middleware for this module
  configure(consumer: MiddlewareConsumer) {
    // Apply the 'LoggerMiddleware' globally to handle all routes ('*')
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
