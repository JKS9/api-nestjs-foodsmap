import { MiddlewareConsumer, Module } from '@nestjs/common';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [StatusModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(/** TODO: Add logger */).forRoutes('*');
  }
}
