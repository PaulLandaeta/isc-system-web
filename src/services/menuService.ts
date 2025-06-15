// src/services/menuService.ts
import apiClient from './apiInstance';

export interface MenuItem {
  name: string;
  path: string;
  icon?: string;
  permissions?: string[];
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

/**
 * Obtiene la configuración del menú para un rol específico
 * @param role Rol del usuario
 * @returns Configuración completa del menú
 */
export const getMenuByRole = async (role: string): Promise<MenuCategory[]> => {
  try {
    const response = await apiClient.get('/menu', {
      params: { role },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error(`No se encontró configuración de menú para el rol: ${role}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error al obtener el menú:', error);
    throw new Error('Error al cargar la configuración de navegación');
  }
};

/**
 * Obtiene los ítems de menú permitidos para un usuario
 * @param permissions Lista de permisos del usuario
 * @returns Items de menú filtrados por permisos
 */
export const getFilteredMenuItems = (
  menu: MenuCategory[],
  permissions: string[]
): MenuCategory[] => {
  return menu
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) => !item.permissions || item.permissions.some((p) => permissions.includes(p))
      ),
    }))
    .filter((category) => category.items.length > 0);
};
