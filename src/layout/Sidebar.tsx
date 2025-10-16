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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";

import UPB_LOGO from "../assets/upb_logo.png";
import { menu } from "../constants/menu";
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
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isSmallOrMediumScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallOrMediumScreen, setOpen]);

  const goToPage = (path: string) => {
    navigate(path);
    if (isSmallOrMediumScreen) {
      setOpen(false);
    }
  };

  for (const key in user?.roles_permissions) {
    if (!user.roles.some((role) => role == user?.roles_permissions[key].role_name))
      user.roles.push(user?.roles_permissions[key].role_name);
  }

  const filteredMenu = menu.filter((item) =>
    item.roles?.some((role) => user?.roles?.includes(role))
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
      "& .MuiDrawer-paper": {
        width: !open && window.innerWidth < 500 ? 0 : undefined,
      },
      }}
    >
      <DrawerHeader>
        <img
          src={UPB_LOGO}
          alt="UPB Logo"
          style={{ width: "100%", height: "auto", maxWidth: "125px" }}
          className="h-10 ms-6 me-1"
        />
        <IconButton onClick={() => setOpen(false)}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {filteredMenu.map((item) => {
          return (
            <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
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
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  data-test-id="sidebar-list-title"
                  color="primary"
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
