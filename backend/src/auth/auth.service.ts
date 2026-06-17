import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(userId: number, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }

  validatePayload(payload: JwtPayload): boolean {
    return !!(payload.sub && payload.email);
  }
}
