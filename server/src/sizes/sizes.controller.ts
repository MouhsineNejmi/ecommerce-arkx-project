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

import { SizesService } from './sizes.service';

import { Public } from '../auth/decorators/public.decorator';

import { CreateSizeDto, EditSizeDto } from '../dto/size.dto';

@Controller('sizes')
export class SizesController {
  constructor(private sizesService: SizesService) {}

  @Public()
  @Get()
  async getAllSizes() {
    return this.sizesService.findAll();
  }

  @Public()
  @Get('/:id')
  async getSizeById(@Param('id') id: string) {
    const size = await this.sizesService.findById(id);

    if (!size) {
      throw new NotFoundException('No size with this id found');
    }

    return size;
  }

  @Post()
  async createSize(@Body() data: CreateSizeDto) {
    const existingSize = await this.sizesService.find({
      name: data.name,
    });

    if (existingSize) {
      throw new ConflictException('Size with this name already exists!');
    }

    return this.sizesService.createSize(data);
  }

  @Post('/:id')
  async editSize(@Param('id') id: string, @Body() data: EditSizeDto) {
    const existingSize = await this.sizesService.find({
      name: data.name,
    });

    if (existingSize.id !== id) {
      throw new ConflictException(
        'Size with this name already exists! Try to rename it.',
      );
    }

    return this.sizesService.updateSize({ where: { id }, data });
  }

  @Delete('/:id')
  async deleteSize(@Param('id') id: string) {
    return this.sizesService.deleteSize({ id });
  }
}
