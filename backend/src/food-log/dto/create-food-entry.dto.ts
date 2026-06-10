import { IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snacks = 'Snacks',
}

export class CreateFoodEntryDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  calories!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  protein!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  carbs!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  fat!: number;

  @ApiProperty()
  @IsString()
  portion!: string;

  @ApiProperty({ enum: MealType })
  @IsEnum(MealType)
  mealType!: MealType;
}
