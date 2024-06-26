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

import { CategoriesService } from './categories.service';

import { Public } from '../auth/decorators/public.decorator';

import { CreateCategoryDto, EditCategoryDto } from '../dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get('/:id')
  async getCategoryById(@Param('id') id: string) {
    const category = await this.categoriesService.findById(id);

    if (!category) {
      throw new NotFoundException('No Category with this id found');
    }

    return category;
  }

  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    const existingCategory = await this.categoriesService.find({
      name: data.name,
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists!');
    }

    return this.categoriesService.createCategory(data);
  }

  @Post('/:id')
  async editCategory(@Param('id') id: string, @Body() data: EditCategoryDto) {
    const existingCategory = await this.categoriesService.find({
      name: data.name,
    });

    if (existingCategory) {
      throw new ConflictException(
        'Category with this name already exists! Try to rename it.',
      );
    }

    return this.categoriesService.updateCategory({ where: { id }, data });
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory({ id });
  }
}
