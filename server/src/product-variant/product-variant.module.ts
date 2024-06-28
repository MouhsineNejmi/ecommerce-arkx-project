import { Module } from '@nestjs/common';

import { ProductVariantController } from './product-variant.controller';

import { ProductVariantService } from './product-variant.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductVariantController],
  providers: [ProductVariantService, PrismaService],
})
export class ProductVariantModule {}
