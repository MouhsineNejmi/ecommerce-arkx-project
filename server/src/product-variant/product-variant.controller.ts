import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { ProductVariantService } from './product-variant.service';

import {
  CreateProductVariantDto,
  EditProductVariantDto,
} from '../dto/product-variant.dto';

import { Public } from '../auth/decorators/public.decorator';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private productVariantsService: ProductVariantService) {}

  @Get()
  async getAllProductVariants() {
    return this.productVariantsService.findAll();
  }

  @Public()
  @Get('/:id')
  async getProductVariantByProductId(@Param('id') id: string) {
    const productVariant =
      await this.productVariantsService.findByProductId(id);

    if (!productVariant) {
      throw new NotFoundException(
        "Looks like this product doesn't have any variants",
      );
    }

    return productVariant;
  }

  @Post()
  async createProductVariants(@Body() data: CreateProductVariantDto[]) {
    return this.productVariantsService.createProductVariants(data);
  }

  @Post('/:id')
  async editProductVariants(
    @Param('id') id: string,
    @Body() data: EditProductVariantDto,
  ) {
    return this.productVariantsService.editProductVariant(id, data);
  }

  @Delete()
  async deleteProductVariants(@Body() productVariantIds: string[]) {
    return this.productVariantsService.deleteProductVariants(productVariantIds);
  }
}
