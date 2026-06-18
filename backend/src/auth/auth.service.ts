import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

export interface JwtPayload {
  sub: number;
  email: string;
}

export interface OAuthUserData {
  provider: string;
  providerId: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  createToken(userId: number, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }

  validatePayload(payload: JwtPayload): boolean {
    return !!(payload.sub && payload.email);
  }

  async findOrCreateUser(data: OAuthUserData) {
    const existing = await this.prisma.db.user.findFirst({
      where: { provider: data.provider, providerId: data.providerId },
    });
    if (existing) return existing;

    return this.prisma.db.user.create({
      data: {
        provider: data.provider,
        providerId: data.providerId,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
      },
    });
  }

  async findUserById(id: number) {
    return this.prisma.db.user.findUnique({ where: { id } });
  }
}
