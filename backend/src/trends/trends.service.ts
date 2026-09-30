import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trend } from './entities/trend.entity.js';
import { CreateTrendDto } from './dto/create-trend.dto.js';
import { UpdateTrendDto } from './dto/update-trend.dto.js';

@Injectable()
export class TrendsService {
  constructor(
    @InjectRepository(Trend)
    private trendsRepository: Repository<Trend>,
  ) {}

  findAll(): Promise<Trend[]> {
    return this.trendsRepository.find();
  }

  findOne(id: number): Promise<Trend | null> {
    return this.trendsRepository.findOneBy({ id });
  }

  create(createTrendDto: CreateTrendDto): Promise<Trend> {
    const trend = this.trendsRepository.create(createTrendDto);

    return this.trendsRepository.save(trend);
  }

  async update(
    id: number,
    updateTrendDto: UpdateTrendDto,
  ): Promise<Trend | null> {
    const trend = await this.trendsRepository.findOneBy({ id });

    if (!trend) {
      return null;
    }

    this.trendsRepository.merge(trend, updateTrendDto);

    return this.trendsRepository.save(trend);
  }

  async delete(id: number): Promise<void> {
    await this.trendsRepository.delete(id);
  }
}
