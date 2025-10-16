import { Permission } from './permissionInterface';

export interface Section {
  name: string;
  permissions: Permission[];
}
