import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Is_Public_key } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // handel access status
    const isPublic = this.reflector.get<boolean>(
      Is_Public_key,
      context.getHandler(),
    );
    if (isPublic) {
      return true; // If the route is public, allow access without authentication
    }
    // Implement your own authentication logic here
    // For example, check the request headers for a valid token
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    console.log(token);
    return true;
  }
}
