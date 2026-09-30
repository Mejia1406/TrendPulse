import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Trend } from './entities/trend.entity.js';
import { TrendsService } from './trends.service.js';
import { CreateTrendDto } from './dto/create-trend.dto.js';
import { UpdateTrendDto } from './dto/update-trend.dto.js';

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get()
  findAll(): Promise<Trend[]> {
    return this.trendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trend | null> {
    return this.trendsService.findOne(Number(id));
  }

  @Post()
  create(@Body() createTrendDto: CreateTrendDto): Promise<Trend> {
    return this.trendsService.create(createTrendDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrendDto: UpdateTrendDto,
  ): Promise<Trend | null> {
    return this.trendsService.update(Number(id), updateTrendDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.trendsService.delete(Number(id));
  }
}
