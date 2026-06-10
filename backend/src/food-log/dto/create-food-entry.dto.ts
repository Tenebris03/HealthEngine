import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateFoodEntryDto {
  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  calories!: number;

  @IsNumber()
  @Min(0)
  protein!: number;

  @IsNumber()
  @Min(0)
  carbs!: number;

  @IsNumber()
  @Min(0)
  fat!: number;

  @IsString()
  mealType!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  portion?: number;
}
