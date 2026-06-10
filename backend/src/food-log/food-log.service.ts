import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

@Injectable()
export class FoodLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFoodEntryDto) {
    return this.prisma.foodEntry.create({ data: dto });
  }

  async findAll() {
    return this.prisma.foodEntry.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
