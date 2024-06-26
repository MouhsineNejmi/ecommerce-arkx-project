import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { ColorsService } from './colors.service';

import { Public } from '../auth/decorators/public.decorator';

import { CreateColorDto, EditColorDto } from '../dto/color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @Public()
  @Get()
  async getAllColors() {
    return this.colorsService.findAll();
  }

  @Public()
  @Get('/:id')
  async getColorById(@Param('id') id: string) {
    const color = await this.colorsService.findById(id);

    if (!color) {
      throw new NotFoundException('No color with this id found');
    }

    return color;
  }

  @Post()
  async createColor(@Body() data: CreateColorDto) {
    const existingColor = await this.colorsService.find({
      name: data.name,
    });

    if (existingColor) {
      throw new ConflictException('Color with this name already exists!');
    }

    return this.colorsService.createColor(data);
  }

  @Post('/:id')
  async editColor(@Param('id') id: string, @Body() data: EditColorDto) {
    const existingColor = await this.colorsService.find({
      name: data.name,
    });

    if (existingColor.id !== id) {
      throw new ConflictException(
        'COlor with this name already exists! Try to rename it.',
      );
    }

    return this.colorsService.updateColor({ where: { id }, data });
  }

  @Delete('/:id')
  async deleteColor(@Param('id') id: string) {
    return this.colorsService.deleteColor({ id });
  }
}
