import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllUsers() {
    return await this.usersService.findAll();
  }
}
