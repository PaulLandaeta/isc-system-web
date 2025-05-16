import { MenuCategory } from './menuModel.ts';

export interface IUserDataStore {
  id: number;
  name: string;
  username: string;
  role: string;
  token: string;
  menu: MenuCategory[];
  permissions: string[];

  setUserData: (newId: number, newName: string, newUsername: string, newRole: string) => void;
  setToken: (newToken: string) => void;
  setMenu: (userMenu: MenuCategory[]) => void;
  addSinglePermission: (permission: string) => void;
  addPermissions: (permissions: string[]) => void;
  clearUser: () => void;
}
