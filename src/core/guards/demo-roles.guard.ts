import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { strict } from 'assert';

@Injectable()
export class DemoRolesGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if(!roles) {
      return true;
    }

    const request =  context.switchToHttp().getRequest();
    const { user } = request;
    const hasRole = () => user.roles.some(role => roles.includes(role));

    console.log('user: ', user);
    console.log('user.roles: ', user.roles);
    console.log('hasRole(): ', hasRole());

    return user && user.roles && hasRole();
  }
}
