export interface CreateUserInput {
  username: string;
  email: string;
  role: "admin" | "manager";
  password: string;
  profile_image?: string;
  active?: boolean;
}

export interface UpdateUserInput {
  username?: string;
  role?: "admin" | "manager";
  profile_image?: string;
  active?: boolean;
}

export interface FindUserOptions {
  username?: string;
  email?: string;
}

export interface UserLogin {
  email: string;
}
