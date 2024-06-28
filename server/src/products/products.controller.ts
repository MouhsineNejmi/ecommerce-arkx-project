import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { Public } from '../auth/decorators/public.decorator';

import { CreateProductDto, EditProductDto } from '../dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  async getAllProducts() {
    return await this.productsService.findAll();
  }

  @Public()
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productsService.findById(id);

    if (!product) {
      throw new NotFoundException('No product with this id found');
    }

    return product;
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return this.productsService.createProduct(data);
  }

  @Post('/:id')
  async editProduct(@Param('id') id: string, @Body() data: EditProductDto) {
    return this.productsService.updateProduct({ where: { id }, data });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productsService.findById(id);

    if (!product) {
      throw new NotFoundException('Product with this id not found');
    }

    return this.productsService.deleteProduct({ id });
  }
}
