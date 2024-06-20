import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { AuthPayloadDto } from '../dto/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersSerive: UsersService) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersSerive.findUserByUsername({ username });

    if (!user) return null;

    const isPassowrdMatches = await bcrypt.compare(password, user.password);

    if (!isPassowrdMatches) {
    }
  }
}
