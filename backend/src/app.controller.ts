import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import jwt from 'jsonwebtoken';
import type { Request } from 'express';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check',
    description: 'Returns a simple greeting to verify the API is running',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/debug/verify-token')
  debugVerifyToken(@Req() req: Request) {
    const auth = req.headers.authorization;
    if (!auth) return { error: 'No Authorization header' };

    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer')
      return { error: 'Malformed Authorization header' };

    const token = parts[1];
    const secret = process.env['JWT_SECRET'] ?? 'fallback-dev-secret';

    const manualResult = (() => {
      try {
        const decoded = jwt.verify(token, secret);
        return { success: true, decoded };
      } catch (e: unknown) {
        return {
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error',
        };
      }
    })();

    const fallbackResult = (() => {
      try {
        const decoded = jwt.verify(token, 'fallback-dev-secret');
        return { success: true, decoded };
      } catch (e: unknown) {
        return {
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error',
        };
      }
    })();

    return {
      tokenPreview: token.substring(0, 40) + '...',
      tokenParts: token
        .split('.')
        .map((p: string) => (p.length > 50 ? p.substring(0, 50) + '...' : p)),
      secret: secret.substring(0, 3) + '...' + secret.slice(-3),
      secretLength: secret.length,
      manualVerify: manualResult,
      fallbackVerify: fallbackResult,
    };
  }
}
