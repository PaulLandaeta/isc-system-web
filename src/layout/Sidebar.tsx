import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";

import UPB_LOGO from "../assets/upb_logo.png";
import Menu from "../constants/menu";
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
  const theme = useTheme();
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isSmallOrMediumScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallOrMediumScreen, setOpen]);

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
      <Menu open={open} />
    </Drawer>
  );
};

export default Sidebar;
