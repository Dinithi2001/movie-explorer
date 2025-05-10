import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Movie Explorer
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeToggle />
          {user ? (
            <>
              {/* <Button
                color="inherit"
                component={RouterLink}
                to="/favorites"
              >
                Favorites
              </Button> */}
              <Button
                color="inherit"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
