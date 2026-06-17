import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';
import type { Profile } from 'passport';

type VerifyDone = (error: Error | null, user?: unknown) => void;

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env['GITHUB_CLIENT_ID'] ?? '',
      clientSecret: process.env['GITHUB_CLIENT_SECRET'] ?? '',
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyDone,
  ): Promise<void> {
    const { id, displayName, emails, photos } = profile;
    const user = await this.authService.findOrCreateUser({
      provider: 'github',
      providerId: id,
      email: emails?.[0]?.value ?? `${id}@github.local`,
      name: displayName,
      avatar: photos?.[0]?.value ?? null,
    });
    done(null, user);
  }
}
