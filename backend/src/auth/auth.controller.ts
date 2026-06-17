import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

const FRONTEND_URL = 'http://localhost:5173';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
