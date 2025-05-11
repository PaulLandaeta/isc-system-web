import { useUserDataStore } from '../store/store';

export function HasPermission(permissionName: string): boolean {
  const permission = permissionName.toLowerCase();
  const userPermissions = useUserDataStore((state) => state.permissions);
  return userPermissions.length > 0 && userPermissions.includes(permission);
}
