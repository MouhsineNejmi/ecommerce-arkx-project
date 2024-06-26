import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';

import { CategoriesController } from './categories.controller';

@Module({
  providers: [CategoriesService, PrismaService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
