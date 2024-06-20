import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';

import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [AuthController, UsersController],
  providers: [PrismaService, AuthService, UsersService],
})
export class AppModule {}
