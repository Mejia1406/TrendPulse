import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Trend } from './entities/trend.entity.js';
import { TrendsService } from './trends.service.js';
import { CreateTrendDto } from './dto/create-trend.dto.js';
import { UpdateTrendDto } from './dto/update-trend.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('trends')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('admin')
  create(@Body() createTrendDto: CreateTrendDto): Promise<Trend> {
    return this.trendsService.create(createTrendDto);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateTrendDto: UpdateTrendDto,
  ): Promise<Trend | null> {
    return this.trendsService.update(Number(id), updateTrendDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string): Promise<void> {
    return this.trendsService.delete(Number(id));
  }
}
