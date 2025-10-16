import { create } from 'zustand';

export interface Carrer {
  id: number;
  fullName: string;
  shortName: string;
  headOfDepartment: string;
}

interface ICarrer {
  carrer: Carrer | null;
  setCarrer: (newCarrer: Carrer) => void;
}

export const useCarrerStore = create<ICarrer>((set) => ({
  carrer: {
    id: 1,
    fullName: 'Ingeniería de Sistemas Computacionales',
    shortName: 'ISC',
    headOfDepartment: 'Alexis Marechal Marin PhD',
  },
  setCarrer: (newCarrer: Carrer) => set({ carrer: newCarrer }),
}));
