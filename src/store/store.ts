import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Seminar } from '../models/studentProcess';
import { UserResponse } from '../services/models/LoginResponse';
import { IUserDataStore } from '../models/userModel';
import { MenuCategory } from '../models/menuModel';

interface IProcessStore {
  process: Seminar | null;
  setProcess: (newProcess: Seminar) => void;
}

interface IUserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // clave en localStorage
    }
  )
);

export const useUserDataStore = create<IUserDataStore>()(
  persist(
    (set) => ({
      id: -1,
      name: '',
      username: '',
      role: '',
      token: '',
      menu: [],
      permissions: [],

      setUserData: (newId: number, newName: string, newUsername: string, newRole: string) => {
        set(() => ({
          id: newId,
          name: newName,
          username: newUsername,
          role: newRole,
        }));
      },
      setToken: (newToken: string) => {
        set(() => ({
          token: newToken,
        }));
      },

      setMenu: (userMenu: MenuCategory[]) => {
        set(() => ({
          menu: userMenu,
        }));
      },

      addSinglePermission: (permission: string) =>
        set((state) => {
          const newPermissions = [...state.permissions];
          newPermissions.push(permission);
          return { permissions: newPermissions };
        }),
      addPermissions: (permissions: string[]) =>
        set((state) => {
          const newPermissions = [...state.permissions];
          newPermissions.push(...permissions);
          return { permissions: newPermissions };
        }),

      clearAllUserData: () => {
        set(() => ({
          id: -1,
          name: '',
          username: '',
          role: '',
          token: '',
          menu: [],
          permissions: [],
        }));
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
