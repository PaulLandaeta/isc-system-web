import { Role } from './roleInterface';

export interface AddTextModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onCreate: (name: string, category: string) => void;
  existingRoles: Role[];
}
