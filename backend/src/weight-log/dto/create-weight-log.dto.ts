import { IsNumber, Min } from 'class-validator';

export class CreateWeightLogDto {
  @IsNumber()
  @Min(20)
  weightKg!: number;
}
