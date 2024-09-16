import { IconButton, InputAdornment, OutlinedInput, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';

import RoleComponent from "./RoleComponent";
import { RoleTableProps } from "../../models/roleTablePropsInterface";
import { ChangeEvent, useEffect, useState } from "react";
import { editRole } from "../../services/roleService";



const RoleTable: React.FC<RoleTableProps> = ({ roles, onRoleSelect, selectedRole, setIsModalVisible}) => {

  const [search, setSearch] = useState("")
  const [filteredRoles, setFilteredRoles] = useState(roles);

  const handleRoleClick = (roleName:  string) => {
    onRoleSelect(roleName);
  };

  const handleRoleDelete = (id: number) =>{
    //TODO eliminar roles
  }

  const handleRoleEdit = async (id: number, role: { name: string; }) => {
    try {
      await editRole(id, role);
      setFilteredRoles(prevRoles => 
        prevRoles.map(r => r.id === id ? { ...r, name: role.name } : r)
      );
    } catch (error) {
      console.error("Failed to update the role:", error);
    }

  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterRoles(search);
  };

  const filterRoles = (searchValue: string) => {
    if (searchValue.trim() === "") {
      setFilteredRoles(roles);
    } else {
      const filtered = roles.filter((role) =>
        role.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredRoles(filtered);
    }
  }

  useEffect(() => {
    filterRoles(search);
  }, [search, roles]);

  return (
    <Table className="border-table">
      <TableHead className="orange-header large-header">
        <TableRow>
          <TableCell className="flex justify-center items-center w-full">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Roles</Typography>
              <IconButton aria-label="add" onClick={() => setIsModalVisible(true)}>
                <PersonAddAlt1Icon fontSize="medium" style={{ color:"white" }} />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
        <OutlinedInput type="text" id="roles-search" placeholder="Buscar rol" onChange={handleSearch} fullWidth sx={{mt: 2, mb: 2}} endAdornment={<InputAdornment position = "end"><SearchIcon/></InputAdornment>}/>
      </TableHead>
      <TableBody sx={{maxHeight: 300, overflowY: 'auto' }}>
        {filteredRoles && filteredRoles.map((role, index) => (
          <TableRow key={index}>
              <RoleComponent role={role} selectedRole={selectedRole} onRoleClick={handleRoleClick} onDelete={handleRoleDelete} onEdited={handleRoleEdit}/>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RoleTable;