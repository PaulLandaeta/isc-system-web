import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EventIcon from "@mui/icons-material/Event";
import ViewListIcon from "@mui/icons-material/ViewList";
import HistoryIcon from "@mui/icons-material/History";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItemButton } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";

import { useUserStore } from "../store/store";
interface MenuProps {
  open: boolean;
}

const Menu: React.FC<MenuProps> = ({ open }) => {
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    navigate(path);
  };

  const menuData = useUserStore((state) => state.menu);

  const getItemIcon = (icon: string) => {
    switch (icon) {
      case "Home":
        return <HomeIcon color="primary" />;
      case "SupervisorAccount":
        return <SupervisorAccountIcon color="primary" />;
      case "ChecklistOutlined":
        return <ChecklistOutlinedIcon color="primary" />;
      case "ManageAccounts":
        return <ManageAccountsIcon color="primary" />;
      case "SchoolOutlined":
        return <SchoolOutlinedIcon color="primary" />;
      case "EmojiPeople":
        return <EmojiPeopleIcon color="primary" />;
      case "AccessTime":
        return <AccessTimeIcon color="primary" />;
      case "SwitchAccount":
        return <SwitchAccountIcon color="primary" />;
      case "SupervisedUserCircle":
        return <SupervisedUserCircleIcon color="primary" />;
      case "PendingActions":
        return <PendingActionsIcon color="primary" />;
      case "Event":
        return <EventIcon color="primary" />;
      case "ViewList":
        return <ViewListIcon color="primary" />;
      case "History":
        return <HistoryIcon color="primary" />;
      case "InsertInvitation":
        return <InsertInvitationIcon color="primary" />;
      default:
        return <ChecklistOutlinedIcon color="primary" />;
    }
  };

  return (
    <List>
      {menuData.map((group) => {
        return (
          <>
            {open && <ListSubheader> {group.category} </ListSubheader>}
            {!open && <Divider />}
            {group.items.map((item) => {
              return (
                <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    data-test-id="sidebar-list-button"
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => goToPage(item.path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {getItemIcon(item.icon)}
                    </ListItemIcon>
                    <ListItemText
                      data-test-id="sidebar-list-title"
                      color="primary"
                      primary={item.displayname}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </>
        );
      })}
    </List>
  );
};

export default Menu;
