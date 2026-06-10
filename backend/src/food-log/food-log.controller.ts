import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoodLogService } from './food-log.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

@Controller('api/food-log')
export class FoodLogController {
  constructor(private readonly foodLogService: FoodLogService) {}

  @Post()
  create(@Body() dto: CreateFoodEntryDto) {
    return this.foodLogService.create(dto);
  }

  @Get()
  findAll() {
    return this.foodLogService.findAll();
  }
}
