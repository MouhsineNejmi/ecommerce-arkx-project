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
    email: string;
    role: USER_ROLE;
    profile: string;
  };
}

export interface RegisterResponseDto extends AccessToken {
  user: {
    id: string;
    username: string;
    email: string;
    role: USER_ROLE;
    profile: string;
  };
}

export interface JwtPayload {
  username: string;
  sub: string;
}
