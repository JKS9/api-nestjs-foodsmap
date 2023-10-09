import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModule } from './modules/status/status.module';
import { winstonConfig } from 'config/logger.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { config } from 'config/env.config';
import { option } from 'config/mongodb.config';
import { UserModule } from './modules/user/user.module';
import { HashPasswordMiddleware } from './middlewares/hash-password/hash-password.middleware';
import { WinstonModule } from 'nest-winston';
import { LoggerMiddleware } from './middlewares/logger/logger.middelware';

@Module({
  imports: [
    MongooseModule.forRoot(config().dataBase.url, option),
    WinstonModule.forRoot(winstonConfig),
    StatusModule,
    AuthenticationModule,
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    consumer.apply(HashPasswordMiddleware).forRoutes('authentication/register');
  }
}
