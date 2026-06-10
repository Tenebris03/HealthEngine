import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WeightLogService } from './weight-log.service';
import { CreateWeightEntryDto } from './dto/create-weight-entry.dto';

@ApiTags('Weight Log')
@Controller('api/weight-log')
export class WeightLogController {
  constructor(private readonly weightLogService: WeightLogService) {}

  @Get()
  @ApiOperation({ summary: 'Get all weight entries' })
  findAll() {
    return this.weightLogService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Add a weight entry' })
  create(@Body() dto: CreateWeightEntryDto) {
    return this.weightLogService.create(dto);
  }
}
