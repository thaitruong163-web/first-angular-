export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  username: string;
  role: UserRole;
  token: string;
}
