import { Module } from '@nestjs/common';

import { BillboardsController } from './billboards.controller';

import { BillboardsService } from './billboards.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BillboardsService, PrismaService],
  controllers: [BillboardsController],
})
export class BillboardsModule {}
