import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeightLogService } from './weight-log.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@Controller('api/weight-log')
export class WeightLogController {
  constructor(private readonly weightLogService: WeightLogService) {}

  @Post()
  create(@Body() dto: CreateWeightLogDto) {
    return this.weightLogService.create(dto);
  }

  @Get()
  findAll() {
    return this.weightLogService.findAll();
  }
}
