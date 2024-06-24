import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';

import { Public } from './decorators/public.decorator';
import {
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from 'src/dto/auth.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto | BadRequestException> {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDto | BadRequestException> {
    return await this.authService.register(registerBody);
  }
}
