import { Module } from '@nestjs/common';
import { WeightLogController } from './weight-log.controller';
import { WeightLogService } from './weight-log.service';

@Module({
  controllers: [WeightLogController],
  providers: [WeightLogService],
})
export class WeightLogModule {}
