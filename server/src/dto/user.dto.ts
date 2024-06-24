export enum USER_ROLE {
  admin = 'admin',
  customer = 'customer',
}

export interface UserModule {
  id?: string;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  password: string;
  role: USER_ROLE;
  profile?: string;
  is_email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserWithoutPasswordModule {
  id?: string;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  role: USER_ROLE;
  profile?: string;
  is_email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
