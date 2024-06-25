import { USER_ROLE } from './user.dto';

export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
  role: USER_ROLE;
}

export interface AccessToken {
  access_token: string;
}

export interface LoginResponseDto extends AccessToken {
  user: {
    id: string;
    username: string;
    role: USER_ROLE;
  };
}

export type RegisterResponseDto = AccessToken;

export interface JwtPayload {
  username: string;
  sub: string;
}
