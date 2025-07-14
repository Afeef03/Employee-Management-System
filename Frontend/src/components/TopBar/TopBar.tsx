import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

type TopbarProps = {
    handleDrawerToggle: () => void;
};

export const Topbar = ({ handleDrawerToggle }: TopbarProps) => {
    const location = useLocation(); 

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - 240px)` },
                ml: { sm: `240px` },
                backgroundColor: '#F4F7FE',
                color: '#1b2559',
            }}
        >
            <Toolbar className='flex w-100% justify-between items-center'>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="h3" sx={{ fontWeight: 'bold', color: '#1b2559' }}>
                    {location.pathname === '/'
                        ? 'Main Dashboard'
                        : location.pathname
                            .replace('/', '')
                            .replace(/-/g, ' ')
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Typography>

                <div className='bg-white p-1.5 flex gap-1 items-center rounded-xl shadow-md'>
                    <input type="text" placeholder='Search' className='bg-secondary p-2 outline-0 rounded-3xl' />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </div>

            </Toolbar>
        </AppBar>
    );
};
