import { useUserStore } from '../store/store';

export function HasPermission(permissionName: string): boolean {
  const permission = permissionName.toLowerCase();
  const userPermissions = useUserStore((state) => state.permissions);
  return userPermissions.length > 0 && userPermissions.includes(permission);
}

export default HasPermission;
