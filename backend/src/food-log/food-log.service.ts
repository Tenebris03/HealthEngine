import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

@Injectable()
export class FoodLogService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFoodEntryDto, userId: number) {
    return this.prisma.db.foodEntry.create({
      data: { ...dto, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.db.foodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
