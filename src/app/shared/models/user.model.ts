export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}


