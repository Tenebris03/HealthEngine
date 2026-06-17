import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeaderboardService } from './leaderboard.service';
import { CurrentUser } from '../auth/current-user.decorator';

@ApiTags('Leaderboard')
@Controller('api/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getLeaderboard(@CurrentUser('sub') userId: number) {
    const users = await this.leaderboardService.getLeaderboard();
    return users.map((u) => ({
      ...u,
      isCurrentUser: u.id === userId,
    }));
  }
}
