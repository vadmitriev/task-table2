import React from 'react';

import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  Link,
  AppBar,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import logo from '@/assets/favicon.svg';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          sx={{
            marginRight: '36px',
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/" color="inherit" underline="none">
          <IconButton color="inherit">
            <Box
              component="img"
              src={logo}
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1 }}
          >
            Энергопотребление ТЭС
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
