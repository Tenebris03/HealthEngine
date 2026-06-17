import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import type { Request, Response } from 'express';

const FRONTEND_URL = 'http://localhost:5173';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('dev-login')
  async devLogin(@Body() body: { email: string }) {
    let user = await this.prisma.db.user.findUnique({ where: { email: body.email } });
    if (!user) {
      user = await this.prisma.db.user.create({
        data: {
          email: body.email,
          provider: 'dev',
          providerId: body.email,
          name: body.email.split('@')[0],
        },
      });
    }
    const token = this.authService.createToken(user.id, user.email);
    return { token, user: { id: user.id, email: user.email } };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: Request, @Res() res: Response): void {
    const user = req.user as { id: number; email: string };
    const token = this.authService.createToken(user.id, user.email);
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}&userId=${user.id}&email=${encodeURIComponent(user.email)}`);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(): void {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: Request, @Res() res: Response): void {
    const user = req.user as { id: number; email: string };
    const token = this.authService.createToken(user.id, user.email);
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}&userId=${user.id}&email=${encodeURIComponent(user.email)}`);
  }

  @ApiOperation({ summary: 'Get current user profile from JWT' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
