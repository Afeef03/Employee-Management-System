import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Sidebar } from '../components/Sidebar/SideBar';
import { Topbar } from '../components/TopBar/TopBar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const Layout = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F4F7FE', }} className='h-screen'>
      <CssBaseline />

      {/* Topbar */}
      <Topbar handleDrawerToggle={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        container={container}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, // <-- this is the fix
        }}
      >
        <Toolbar /> {/* pushes content below Topbar */}
        <Outlet />
      </Box>

    </Box>

  );
};

export default Layout;
