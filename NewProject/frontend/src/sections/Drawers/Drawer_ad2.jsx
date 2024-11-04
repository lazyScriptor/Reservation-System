import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { PiCourtBasketballThin } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { CiSquareChevUp, CiSquareChevDown } from "react-icons/ci";
import { CiInboxIn } from "react-icons/ci";
import { PiMailboxThin } from "react-icons/pi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RiReservedLine } from "react-icons/ri";

const drawerWidth = 200;

const BUTTONARRAY = [
  {
    id: 1,
    name: "Dashboard",
    navigation: "/dashboard-admin",
    icon: <RxDashboard />,
  },
  {
    id: 2,
    name: "Create places",
    navigation: "/courts-admin",
    icon: <PiCourtBasketballThin />,
    children: [
      {
        id: 1,
        name: "Create Venue",
        navigation: "/create-venue-admin",
        icon: <IoCreateOutline />,
      },
      {
        id: 2,
        name: "Create Court Type",
        navigation: "/create-court-type-admin",
        icon: <IoCreateOutline />,
      },
      {
        id: 3,
        name: "Create Court",
        navigation: "/create-court-admin",
        icon: <IoCreateOutline />,
      },
    ],
  },
  {
    id: 4,
    name: "Reservations",
    navigation: "/reservation-admin",
    icon: <RiReservedLine />,
  },
  {
    id: 3,
    name: "Logout",
    navigation: "/",
    icon: <RxDashboard />,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer({ children, number, subNumber }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [subButtonState, setSubButtontState] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, display: open ? "none" : "inline-flex" }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ marginRight: 2, display: !open ? "none" : "inline-flex" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {BUTTONARRAY.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem disablePadding sx={{ paddingX: 1 }}>
                <ListItemButton
                  onClick={() => {
                    navigate(item.navigation);
                    if (item.children) setSubButtontState(!subButtonState);
                  }}
                  sx={{
                    backgroundColor: item.id === number ? "#00aaff50" : "transparent",
                    justifyContent: open ? "initial" : "center",
                    px: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{ fontSize: "0.875rem" }}
                        sx={{ color: item.id === number ? "#00aaffff" : "" }}
                      />
                      {item.children && (subButtonState ? <CiSquareChevUp /> : <CiSquareChevDown />)}
                    </>
                  )}
                </ListItemButton>
              </ListItem>

              {open && item.children && subButtonState &&
                item.children.map((child) => (
                  <ListItem key={child.id} sx={{ paddingX: 2 }}>
                    <ListItemButton
                      onClick={() => navigate(child.navigation)}
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        backgroundColor: child.id === subNumber ? "#00aaff50" : "transparent",
                        borderRadius: 1,
                        ml: 2,
                        px: 1.5,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={child.name}
                        primaryTypographyProps={{ fontSize: "0.75rem" }}
                        sx={{ color: child.id === subNumber ? "#00aaffff" : "" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((item, index) => (
            <ListItem key={item} disablePadding sx={{ display: "block", paddingX: 1 }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                  {index % 2 === 0 ? <CiInboxIn /> : <PiMailboxThin />}
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
