import { User } from './userInterface';

export interface UserFormProps {
  handleClose: () => void;
  openCreate: boolean;
  user: User | null;
}
