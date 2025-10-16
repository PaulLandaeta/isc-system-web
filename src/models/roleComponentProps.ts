import { Role } from './roleInterface';

export interface RoleComponentProps {
  role: Role;
  selectedRole: string;
  onRoleClick: (roleName: string) => void;
  onDelete: (id: number) => void;
  onEdited: (id: number, role: { name: string }) => void;
}
