import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  // constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userId = context.switchToHttp().getRequest().body.userId;
    //const token = context.switchToHttp().getRequest().headers['authorization'];
    return userId === 1;
  }
}
