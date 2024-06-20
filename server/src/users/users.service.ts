import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { FindUserByUsernameDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findUserByUsername({ username }: FindUserByUsernameDto) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
