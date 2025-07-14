import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { toast } from "react-toastify";

const drawerWidth = 240;

type SidebarProps = {
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  container?: (() => Window) | undefined;
  handleDrawerTransitionEnd: () => void;
};

const navItems = [
  {
    title: "Main Dashboard",
    icon: <DashboardIcon />,
    navLink: "/",
  },
  {
    title: "All Employees",
    icon: <PeopleIcon />,
    navLink: "/employees",
  },
  {
    title: "Profile",
    icon: <AccountBoxIcon />,
    navLink: "/profile",
  },
  {
    title: "Sign In",
    icon: <LoginIcon />,
    navLink: "/sign-in",
  },
  {
    title: "Sign Up",
    icon: <LockIcon />,
    navLink: "/sign-up",
  },
  {
    title: "Log out",
    icon: <LogoutIcon />,
    action: "logout",
  },
];

export const Sidebar = ({
  mobileOpen,
  handleDrawerClose,
  container,
  handleDrawerTransitionEnd,
}: SidebarProps) => {
  const navigate = useNavigate(); // ✅ Hook inside the component

  const handleLogoutClick = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("token");
      toast.success("Logout successful");
      navigate("/sign-in");
    }
  };

  const drawer = (
    <div>
      <Logo />
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            {item.action === "logout" ? (
              <ListItemButton onClick={handleLogoutClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                to={item.navLink}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav style={{ flexShrink: 0 }} aria-label="sidebar navigation">
      {/* Mobile drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        slotProps={{
          root: {
            keepMounted: true,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </nav>
  );
};
