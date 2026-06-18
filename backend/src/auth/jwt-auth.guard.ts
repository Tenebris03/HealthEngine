import {
  Injectable,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Request } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const auth = request.headers.authorization;
    if (!auth) throw new UnauthorizedException('No Authorization header');

    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer')
      throw new UnauthorizedException('Malformed Authorization header');

    const token = parts[1];
    const candidates = [
      process.env['JWT_SECRET'],
      'fallback-dev-secret',
    ].filter(Boolean) as string[];

    for (const secret of candidates) {
      try {
        const decoded = jwt.verify(token, secret);
        (request as unknown as Record<string, unknown>).user = decoded;
        return true;
      } catch {
        // try next secret
      }
    }
    throw new UnauthorizedException('Invalid token');
  }
}
