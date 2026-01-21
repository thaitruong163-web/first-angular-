import { UserRole } from './user-role.enum';

export class User {
  readonly id:number;
  readonly username: string;
  readonly role: UserRole;

  constructor (data: User){
    this.id = data.id ?? 0;
    this.username = data.username ?? 'guest';
    this.role = data.role ?? UserRole.USER;
  }
}