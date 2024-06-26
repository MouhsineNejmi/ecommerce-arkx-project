import { Module } from '@nestjs/common';

import { ColorsController } from './colors.controller';

import { ColorsService } from './colors.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, PrismaService],
})
export class ColorsModule {}
