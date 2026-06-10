import { Injectable } from '@nestjs/common';
import { CreateWeightEntryDto } from './dto/create-weight-entry.dto';

export interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
}

@Injectable()
export class WeightLogService {
  private entries: WeightEntry[] = [
    { id: '1', weight: 95, date: new Date('2024-01-01') },
    { id: '2', weight: 93.2, date: new Date('2024-02-01') },
    { id: '3', weight: 91.8, date: new Date('2024-03-01') },
    { id: '4', weight: 90.1, date: new Date('2024-04-01') },
    { id: '5', weight: 88.7, date: new Date('2024-05-01') },
    { id: '6', weight: 87.5, date: new Date('2024-06-01') },
  ];

  findAll(): WeightEntry[] {
    return this.entries;
  }

  create(dto: CreateWeightEntryDto): WeightEntry {
    const entry: WeightEntry = {
      id: Date.now().toString(),
      weight: dto.weight,
      date: new Date(),
    };
    this.entries.push(entry);
    return entry;
  }
}
