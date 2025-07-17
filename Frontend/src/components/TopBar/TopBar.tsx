import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useLocation, useParams } from "react-router-dom";

type TopbarProps = {
  handleDrawerToggle: () => void;
};

export const Topbar = ({ handleDrawerToggle }: TopbarProps) => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
        backgroundColor: "#F4F7FE",
        color: "#1b2559",
      }}
    >
      <Toolbar className="flex w-100% justify-between items-center">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="h3"
          sx={{ fontWeight: "bold", color: "#1b2559" }}
        >
          {/* /* {location.pathname === '/'
                        ? 'Main Dashboard'
                        : location.pathname
                            .replace('/', '')
                            .replace(/-/g, ' '
                            .replace(/\b\w/g, (c) => c.toUpperCase())} */}
          {location.pathname === "/"
            ? "Main Dashboard"
            : location.pathname === "/profile"
            ? "Profile Page"
            : location.pathname === "/employees"
            ? "Employees Page"
            : location.pathname === `/employees/edit/${id}`
            ? "Employee Edit Page"
            : location.pathname === '/add-employee'
            ? "Add Employee Page"
            : location.pathname === `/edit/${id}`
            ? "Edit Profile Page"
            : location.pathname === `/employees/${id}`
            ? "Employee"
            : "Page"
            }
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
