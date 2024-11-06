import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WrapDataInterceptor } from './common/interceptors/wrap-interceptor/wrap-data.interceptor';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, CommonModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: WrapDataInterceptor },
  ],
})
export class AppModule {}
