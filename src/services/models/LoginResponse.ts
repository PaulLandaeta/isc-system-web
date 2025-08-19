import { MenuCategory } from '../../models/menuModel';
import { User } from '../../models/userInterface';

export interface LoginResponse {
  token: string;
  id: number;
  roles: string[];
}

export interface UserResponse {
  user: User;
  permissions: string[];
  token: string;
  menu: MenuCategory[];
}
