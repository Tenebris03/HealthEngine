import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightLogDto {
  @ApiProperty({ description: 'Weight in kilograms', minimum: 20 })
  @IsNumber()
  @Min(20)
  weightKg!: number;
}
