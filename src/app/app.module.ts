import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModule } from './modules/status/status.module';
import { LoggerMiddleware } from 'config/logger.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { config } from 'config/env.config';
import { option } from 'config/mongodb.config';

// Define the main application module called 'AppModule'
@Module({
  imports: [
    StatusModule,
    AuthenticationModule,
    MongooseModule.forRoot(config().dataBase.url, option),
  ],
})
export class AppModule {
  // Configure middleware for this module
  configure(consumer: MiddlewareConsumer) {
    // Apply the 'LoggerMiddleware' globally to handle all routes ('*')
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
