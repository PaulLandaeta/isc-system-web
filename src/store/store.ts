import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Seminar } from '../models/studentProcess';
import { IUserDataStore } from '../models/userModel';
import { User } from '../models/userInterface';
import { MenuCategory } from '../models/menuModel';

interface IProcessStore {
  process: Seminar | null;
  setProcess: (newProcess: Seminar) => void;
}

export const useUserStore = create<IUserDataStore>()(
  persist(
    (set) => ({
      user: {} as User,
      menu: [],
      permissions: [],
      token: '',

      login: (userP: User, menuP: MenuCategory[], permissionsP: string[]) => {
        set({ user: userP, menu: menuP, permissions: permissionsP });
      },

      logout: () => {
        set({ user: {} as User, menu: [], permissions: [] });
      },
    }),
    {
      name: 'user-data-storage',
    }
  )
);

export const useProcessStore = create<IProcessStore>((set) => ({
  process: null,
  setProcess: (newProcess: Seminar) => set({ process: newProcess }),
}));
