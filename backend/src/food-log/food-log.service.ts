import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

@Injectable()
export class FoodLogService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFoodEntryDto) {
    return this.prisma.db.foodEntry.create({ data: dto });
  }

  findAll() {
    return this.prisma.db.foodEntry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
