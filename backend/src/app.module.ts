import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodLogModule } from './food-log/food-log.module';

@Module({
  imports: [FoodLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
