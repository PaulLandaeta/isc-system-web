import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Seminar } from '../models/studentProcess';
import { UserResponse } from '../services/models/LoginResponse';

interface MenuItem {
  name: string;
  path: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface IUserStore {
  user: UserResponse | null;
  menu: MenuCategory[];
  setUser: (user: UserResponse | null) => void;
  setMenu: (menu: MenuCategory[]) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      menu: [],
      setUser: (user) => set({ user }),
      setMenu: (menu) => set({ menu }),
      clearUser: () => set({ user: null, menu: [] }),
    }),
    {
      name: 'user-storage', // clave en localStorage
    }
  )
);

