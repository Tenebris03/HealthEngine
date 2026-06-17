import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import bcrypt from 'bcrypt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { Request, Response } from 'express';

const FRONTEND_URL = 'http://localhost:5173';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const existing = await this.prisma.db.user.findUnique({
      where: { email: body.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await this.prisma.db.user.create({
      data: {
        email: body.email,
        name: body.name ?? body.email.split('@')[0],
        passwordHash,
        provider: 'local',
        providerId: body.email,
      },
    });
    const token = this.authService.createToken(user.id, user.email);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        age: user.age,
      },
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.prisma.db.user.findUnique({
      where: { email: body.email },
    });
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(body.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.authService.createToken(user.id, user.email);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        age: user.age,
      },
    };
  }

  @Post('dev-login')
  async devLogin(@Body() body: { email: string }) {
    let user = await this.prisma.db.user.findUnique({
      where: { email: body.email },
    });
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
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        age: user.age,
      },
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: Request, @Res() res: Response): void {
    const user = req.user as {
      id: number;
      email: string;
      name?: string;
      avatar?: string;
      age?: number | null;
    };
    const token = this.authService.createToken(user.id, user.email);
    const params = new URLSearchParams({
      token,
      userId: String(user.id),
      email: user.email,
    });
    if (user.name) params.set('name', user.name);
    if (user.avatar) params.set('avatar', user.avatar);
    if (user.age) params.set('age', String(user.age));
    res.redirect(`${FRONTEND_URL}/auth/callback?${params}`);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(): void {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req: Request, @Res() res: Response): void {
    const user = req.user as {
      id: number;
      email: string;
      name?: string;
      avatar?: string;
      age?: number | null;
    };
    const token = this.authService.createToken(user.id, user.email);
    const params = new URLSearchParams({
      token,
      userId: String(user.id),
      email: user.email,
    });
    if (user.name) params.set('name', user.name);
    if (user.avatar) params.set('avatar', user.avatar);
    if (user.age) params.set('age', String(user.age));
    res.redirect(`${FRONTEND_URL}/auth/callback?${params}`);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    const payload = req.user as { sub: number };
    return this.prisma.db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        age: true,
        heightCm: true,
        targetWeightKg: true,
        dailyCalorieGoal: true,
      },
    });
  }

  @ApiOperation({ summary: 'Update user profile settings' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Body() body: UpdateProfileDto, @Req() req: Request) {
    const payload = req.user as { sub: number };
    return this.prisma.db.user.update({
      where: { id: payload.sub },
      data: body,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        age: true,
        heightCm: true,
        targetWeightKg: true,
        dailyCalorieGoal: true,
      },
    });
  }
}
