import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [AuthController, UserController],
  providers: [PrismaService, AuthService, UserService],
})
export class AppModule {}
