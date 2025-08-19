import { MenuCategory } from './menuModel.ts';
import { User } from './userInterface.ts';

export interface IUserDataStore {
  user: User;
  menu: MenuCategory[];
  permissions: string[];
  token: string;

  login: (usuario: User, menu: MenuCategory[], permissions: string[], token: string) => void;
  logout: () => void;
  //todo se va
  //se remplaza por login y logout
}
