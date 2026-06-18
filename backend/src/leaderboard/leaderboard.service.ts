import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getLeaderboard() {
    const users = await this.prisma.db.user.findMany({
      where: { points: { gt: 0 } },
      orderBy: { points: 'desc' },
      select: {
        id: true,
        name: true,
        avatar: true,
        points: true,
      },
    });

    return users.map((u, i) => ({
      rank: i + 1,
      id: u.id,
      username: u.name ?? `User ${u.id}`,
      avatar: u.avatar ?? '',
      points: u.points,
    }));
  }
}
