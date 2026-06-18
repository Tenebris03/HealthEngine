import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { GithubStrategy } from './github.strategy';
import { PrismaModule } from '../prisma/prisma.module';

console.log(
  '[AuthModule] Module eval - JWT_SECRET present:',
  !!process.env['JWT_SECRET'],
);
console.log(
  '[AuthModule] Module eval - signing secret:',
  (process.env['JWT_SECRET'] ?? 'fallback-dev-secret').substring(0, 5) + '...',
);

const googleStrategyProvider = process.env['GOOGLE_CLIENT_ID']
  ? [GoogleStrategy]
  : [];

const githubStrategyProvider = process.env['GITHUB_CLIENT_ID']
  ? [GithubStrategy]
  : [];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'] ?? 'fallback-dev-secret',
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    ...googleStrategyProvider,
    ...githubStrategyProvider,
  ],
  exports: [AuthService],
})
export class AuthModule {}
