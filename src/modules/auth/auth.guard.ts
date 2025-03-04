import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const request: Record<string, any> = context
      .switchToHttp()
      .getRequest<Request>();
    const userRole = request?.session?.userData?.role;
    // console.log('Session trong AuthGuard:', request.session);
    // console.log('UserData trong session:', request.session?.userData);
    // console.log('requiredRoles', requiredRoles?.includes(userRole));
    if (!userRole) {
      throw new UnauthorizedException('You are not authorized');
    }
    if (requiredRoles && !requiredRoles?.includes(userRole)) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return true;
  }
}
