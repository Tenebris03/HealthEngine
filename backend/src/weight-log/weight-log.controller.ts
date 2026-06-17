import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { JwtPayload } from '../auth/auth.service';
import { WeightLogService } from './weight-log.service';
import { CreateWeightLogDto } from './dto/create-weight-log.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/weight-log')
export class WeightLogController {
  constructor(private readonly weightLogService: WeightLogService) {}

  @Post()
  create(@Body() dto: CreateWeightLogDto, @CurrentUser() user: JwtPayload) {
    return this.weightLogService.create(dto, user.sub);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.weightLogService.findAll(user.sub);
  }
}
