import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before, Request Interceptor', context);
    return next.handle().pipe(
      map((data) => {
        // console.log('After, Response Interceptor', data);
        return { response: data };
      }),
    );
  }
}
