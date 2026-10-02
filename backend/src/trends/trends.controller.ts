import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

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

  @Get('top-by-views')
  findTopByViews(@Query('limit') limit?: string) {
    return this.trendsService.findTopByViews(
      limit ? Number(limit) : 5,
    );
  }

  @Get('stats-by-social-media')
  findStatsBySocialMedia() {
    return this.trendsService.findStatsBySocialMedia();
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
