/* eslint-disable no-console */
import { useEffect, useState, useCallback } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import "../../components/administration/AdministratorPageComponents.css";
import RoleTable from "../../components/administration/RoleTable";
import PermissionTable from "../../components/administration/PermissionTable";
import AddTextModal from "../../components/common/AddTextModal";
import { getRoles, addRole } from "../../services/roleService";
import Role from "../../models/roleInterface";

const AdministratorPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [title, setTitle] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const [currentRole, setCurrentRole] = useState<Role>({
    name: "",
    id: 0,
    disabled: false,
    permissions: [],
  });

  const extractRoles = useCallback((rolesResponse: unknown) => {
    console.log("Raw roles response:", rolesResponse);
    const rolesFetched: Role[] = [];

    // Asegurarse de que tenemos datos válidos
    if (!rolesResponse || typeof rolesResponse !== "object" || !("data" in rolesResponse)) {
      console.warn("No data in response");
      return rolesFetched;
    }

    const responseData = (rolesResponse as { data: Record<string, unknown> }).data;
    console.log("Full API response:", JSON.stringify(rolesResponse, null, 2));

    // Procesar los roles del objeto data (formato: { "NombreRol": { id, disabled, permissions } })
    Object.entries(responseData).forEach(([roleName, roleData]) => {
      console.log("Processing role:", roleName, JSON.stringify(roleData, null, 2));
      if (roleData && typeof roleData === "object" && "id" in roleData) {
        const role = roleData as {
          id: number;
          disabled?: boolean;
          permissions?: { actions?: string[] };
        };
        rolesFetched.push({
          id: role.id || rolesFetched.length + 1,
          name: roleName,
          disabled: role.disabled || false,
          permissions: role.permissions?.actions || [],
        });
      }
    });

    console.log("Final processed roles:", JSON.stringify(rolesFetched, null, 2));
    return rolesFetched;
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const rolesData = await getRoles();
      const rolesFetched = extractRoles(rolesData);
      if (rolesFetched.length > 0) {
        setRoles(rolesFetched);
        setTitle(rolesFetched[0].name);
        setCurrentRole(rolesFetched[0]);
      } else {
        console.warn("No roles found in response");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, [extractRoles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleCreate = useCallback(
    async (roleName: string, category: string) => {
      try {
        console.log("Creating role:", { roleName, category });
        const created = await addRole({ name: roleName, category });
        console.log("New role created:", created);

        // Actualizar inmediatamente el estado local para reflejar el nuevo rol
        const optimisticRole: Role = {
          id: created?.id ?? Date.now(),
          name: roleName,
          disabled: false,
          permissions: [],
        };
        setRoles((prev) => {
          const next = [
            optimisticRole,
            ...prev.filter((r) => r.name.toLowerCase() !== roleName.toLowerCase()),
          ];
          return next;
        });
        setTitle(roleName);
        setCurrentRole(optimisticRole);

        // Re-sincronizar con servidor en background
        try {
          const updated = await getRoles();
          const rolesFetched = extractRoles(updated);
          if (rolesFetched.length > 0) {
            setRoles(rolesFetched);
            const match = rolesFetched.find((r) => r.name.toLowerCase() === roleName.toLowerCase());
            if (match) {
              setTitle(match.name);
              setCurrentRole(match);
            }
          }
        } catch (syncErr) {
          console.warn("Background sync after create failed:", syncErr);
        }
      } catch (error) {
        console.error("Error creating role:", error);
      }
    },
    [extractRoles, setTitle, setCurrentRole]
  );

  const handleRoleSelect = useCallback(
    (roleName: string) => {
      setTitle(roleName);
      const selectedRole = roles.find((role: Role) => role.name === roleName);
      if (selectedRole) {
        setCurrentRole(selectedRole);
      }
    },
    [roles]
  );

  return (
    <Grid container spacing={3} sx={{ justifyContent: isSmall ? "center" : "flex-start" }}>
      <Grid item xs={12}>
        <Typography variant="h5" align="left" sx={{ marginBottom: 2 }}>
          <ManageAccountsIcon color="primary" fontSize="large" sx={{ marginRight: 2 }} />
          {"Permisos de "}
          {title}
        </Typography>
      </Grid>
      <Grid item xs={!isSmall ? 3 : 12}>
        <RoleTable
          roles={roles}
          onRoleSelect={handleRoleSelect}
          selectedRole={title}
          setIsModalVisible={setIsModalVisible}
        />
      </Grid>
      <Grid item xs={9}>
        {!isSmall && <PermissionTable currentRol={currentRole} />}
      </Grid>
      <AddTextModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onCreate={handleCreate}
        existingRoles={roles}
      />
    </Grid>
  );
};

export default AdministratorPage;
