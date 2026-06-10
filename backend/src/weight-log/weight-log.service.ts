import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@Injectable()
export class WeightLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWeightLogDto) {
    return this.prisma.weightLog.create({ data: dto });
  }

  async findAll() {
    return this.prisma.weightLog.findMany({ orderBy: { timestamp: 'desc' } });
  }
}
