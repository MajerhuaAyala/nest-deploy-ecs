import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHandler(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHandler(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}