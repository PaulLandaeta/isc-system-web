import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Divider, ListItemButton } from "@mui/material";
import { useUserDataStore } from "../store/store";
import ListSubheader from "@mui/material/ListSubheader";
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

import UPB_LOGO from "../assets/upb_logo.png";
import { useUserStore } from "../store/store";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const user = useUserStore((state) => state.user);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goToPage = (path: string) => {
    navigate(path);
  };

  for (const key in user?.roles_permissions) {
    if (!user.roles.some((role) => role == user?.roles_permissions[key].role_name))
      user.roles.push(user?.roles_permissions[key].role_name);
  }

  const menuData = useUserDataStore((state) => state.menu);

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
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img
          src={UPB_LOGO}
          alt="UPB Logo"
          style={{ width: "100%", height: "auto", maxWidth: "125px" }}
          className="h-10 ms-6 me-1"
        />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
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
    </Drawer>
  );
};

export default Sidebar;
