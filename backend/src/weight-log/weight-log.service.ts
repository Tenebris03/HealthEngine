import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@Injectable()
export class WeightLogService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateWeightLogDto, userId: number) {
    return this.prisma.db.weightLog.create({
      data: { ...dto, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.db.weightLog.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
