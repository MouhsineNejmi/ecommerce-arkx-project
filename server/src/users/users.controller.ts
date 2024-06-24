import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

// import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async getUserProfile(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }
}
