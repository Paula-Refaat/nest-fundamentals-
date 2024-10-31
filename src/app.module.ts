import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapDataInterceptor } from './common/interceptors/wrap-interceptor/wrap-data.interceptor';

@Module({
  imports: [UserModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: WrapDataInterceptor },
  ],
})
export class AppModule {}
