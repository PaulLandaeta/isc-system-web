/* eslint-disable camelcase */
import apiClient from './apiInstance';

const route = 'roles/';

export const getRoles = async () => {
  try {
    // Obtener roles de estudiantes y profesores por separado
    const [studentRolesResponse, professorRolesResponse, customRolesResponse] = await Promise.all([
      apiClient.get(`${route}student`),
      apiClient.get(`${route}professor`),
      apiClient.get('roles'),
    ]);

    console.log('Student roles response:', studentRolesResponse.data);
    console.log('Professor roles response:', professorRolesResponse.data);
    console.log('Custom roles response:', customRolesResponse.data);

    const studentRoles = studentRolesResponse.data.data || [];
    const professorRoles = professorRolesResponse.data.data || [];
    // El endpoint /roles devuelve directamente un array según db.json
    const customRoles = Array.isArray(customRolesResponse.data) ? customRolesResponse.data : [];

    // Combinar todos los roles en un objeto
    const allRoles: Record<
      string,
      { id: number; disabled: boolean; permissions: { page: string[]; actions: string[] } }
    > = {};

    // Agregar roles de estudiantes
    studentRoles.forEach((role: { id: number; name: string; disabled?: boolean }) => {
      if (role.name) {
        allRoles[role.name] = {
          id: role.id,
          disabled: role.disabled || false,
          permissions: {
            page: [],
            actions: [],
          },
        };
      }
    });

    // Agregar roles de profesores
    professorRoles.forEach((role: { id: number; name: string; disabled?: boolean }) => {
      if (role.name) {
        allRoles[role.name] = {
          id: role.id,
          disabled: role.disabled || false,
          permissions: {
            page: [],
            actions: [],
          },
        };
      }
    });

    // Agregar roles personalizados
    customRoles.forEach((role: { id: number; name: string; disabled?: boolean }) => {
      if (role.name) {
        allRoles[role.name] = {
          id: role.id,
          disabled: role.disabled || false,
          permissions: {
            page: [],
            actions: [],
          },
        };
      }
    });

    const combinedRoles = {
      success: true,
      data: allRoles,
      message: 'All roles retrieved successfully',
    };

    console.log('Combined roles:', combinedRoles);
    return combinedRoles;
  } catch (error) {
    console.error('Error getting roles:', error);
    throw new Error(`Failed to get roles: ${(error as Error).message}`);
  }
};

export const getProfessorRoles = async () => {
  try {
    const response = await apiClient.get(`${route}professor`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get professor roles${(error as Error).message}`);
  }
};

export const getStudentRoles = async () => {
  try {
    const response = await apiClient.get(`${route}student`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get student roles${(error as Error).message}`);
  }
};

export const addRole = async (role: { name: string; category: string }) => {
  try {
    console.log('Sending role data:', role);

    // Crear el rol en la tabla de roles personalizados
    const customRoleResponse = await apiClient.post('roles', {
      roleName: role.name,
    });
    console.log('Custom role response:', customRoleResponse.data);

    return customRoleResponse.data;
  } catch (error: unknown) {
    console.error('API error details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to add role: ${errorMessage}`);
  }
};

export const editRole = async (id: number, role: { name: string }) => {
  try {
    const response = await apiClient.put(route + id, role);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to edit role: ${(error as Error).message}`);
  }
};

export const deleteRole = async (id: number) => {
  try {
    const response = await apiClient.delete(route + id);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete role: ${(error as Error).message}`);
  }
};

export const addPermisionToRole = async (role_id: number, permission_id: number) => {
  try {
    const response = await apiClient.post(`${route}permissions/`, { role_id, permission_id });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add a permission: ${(error as Error).message}`);
  }
};

export const removePermisionToRole = async (role_id: number, permission_id: number) => {
  try {
    const response = await apiClient.delete(`${route}permissions/`, {
      data: { role_id, permission_id },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to remove a permission: ${(error as Error).message}`);
  }
};
