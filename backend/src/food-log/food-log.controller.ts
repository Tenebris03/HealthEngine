import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FoodLogService } from './food-log.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

@ApiTags('Food Log')
@Controller('api/food-log')
export class FoodLogController {
  constructor(private readonly foodLogService: FoodLogService) {}

  @Get()
  @ApiOperation({ summary: "Get today's food entries" })
  findAll() {
    return this.foodLogService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Add a food entry' })
  create(@Body() dto: CreateFoodEntryDto) {
    return this.foodLogService.create(dto);
  }
}
