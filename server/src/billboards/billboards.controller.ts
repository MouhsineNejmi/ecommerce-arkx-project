import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { BillboardsService } from './billboards.service';

import { Public } from '../auth/decorators/public.decorator';

import { CreateBillboardDto, EditBillboardDto } from '../dto/billboard.dto';

@Controller('billboards')
export class BillboardsController {
  constructor(private billboardService: BillboardsService) {}

  @Get()
  async getAllBillboards() {
    return this.billboardService.findAll();
  }

  @Public()
  @Get('/:id')
  async getBillboardById(@Param('id') id: string) {
    const billboard = await this.billboardService.findById(id);

    if (!billboard) {
      throw new NotFoundException('No billboard with this id found');
    }

    return billboard;
  }

  @Post()
  async createBillboard(@Body() data: CreateBillboardDto) {
    return this.billboardService.createBillboard(data);
  }

  @Post('/:id')
  async editBillboard(@Param('id') id: string, @Body() data: EditBillboardDto) {
    return this.billboardService.updateBillboard({ where: { id }, data });
  }

  @Delete('/:id')
  async deleteBillboard(@Param('id') id: string) {
    return this.billboardService.deleteBillboard({ id });
  }
}
