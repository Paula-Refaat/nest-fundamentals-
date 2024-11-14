import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapDataInterceptor } from './common/interceptors/wrap-interceptor/wrap-data.interceptor';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UserModule, CommonModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: WrapDataInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'user/:id', method: RequestMethod.PATCH }) // exclude patch method for user
      .forRoutes(UsersController);
  }
}
