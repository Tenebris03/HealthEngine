import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightEntryDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  weight!: number;
}
