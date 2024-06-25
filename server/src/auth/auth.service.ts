import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';

import {
  AccessToken,
  JwtPayload,
  LoginResponseDto,
  RegisterRequestDto,
} from '../dto/auth.dto';
import { UserModule, UserWithoutPasswordModule } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserWithoutPasswordModule> {
    const user: User = await this.usersService.findUser({ username });

    if (!user) throw new HttpException('Invalid Credentials', 401);

    const isPassowrdMatches: boolean = await bcrypt.compare(
      pass,
      user.password,
    );

    if (!isPassowrdMatches) {
      throw new BadRequestException('Password does not match');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result as UserWithoutPasswordModule;
  }

  async login(user: UserModule): Promise<LoginResponseDto> {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: { id: user.id, username: user.username, role: user.role },
    };
  }

  async register(
    user: RegisterRequestDto,
  ): Promise<AccessToken | BadRequestException> {
    const { username, password } = user;
    const existingUser = await this.usersService.findUser({ username });

    if (existingUser) {
      throw new ConflictException(
        'User with this username or email already exists!',
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { ...user, password: hashedPassword };

    await this.usersService.createUser(newUser);

    return await this.login(newUser);
  }
}
