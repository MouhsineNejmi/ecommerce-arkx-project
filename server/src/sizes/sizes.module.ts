import { Module } from '@nestjs/common';

import { SizesController } from './sizes.controller';

import { SizesService } from './sizes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SizesService, PrismaService],
  controllers: [SizesController],
})
export class SizesModule {}
