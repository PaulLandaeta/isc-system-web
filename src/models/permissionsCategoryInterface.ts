import { Permission } from './permissionInterface';

export interface PermissionsCategory {
  [name: string]: [permissions: Permission[]];
}
