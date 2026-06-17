import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { JwtPayload } from '../auth/auth.service';
import { FoodLogService } from './food-log.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/food-log')
export class FoodLogController {
  constructor(private readonly foodLogService: FoodLogService) {}

  @Post()
  create(@Body() dto: CreateFoodEntryDto, @CurrentUser() user: JwtPayload) {
    return this.foodLogService.create(dto, user.sub);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.foodLogService.findAll(user.sub);
  }
}
