import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  createTheme,
  CssBaseline,
  styled,
  ThemeProvider,
} from '@mui/material';
import { Header, Sidebar } from '@/components';
import { purple, teal } from '@mui/material/colors';
import ErrorBoundary from '@/components/ErrorBoundary';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  flexDirection: 'column',
});

const theme = createTheme({
  palette: {
    primary: {
      main: purple[300],
    },
    secondary: {
      main: teal[300],
    },
  },
});

const MainLayout = () => {
  const [isOpen, setOpen] = useState(false);

  const handleSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <RootStyle>
          <CssBaseline />
          <Header toggleSidebar={handleSidebar} />
          <Sidebar open={isOpen} toggle={handleSidebar} />
          <Outlet />
        </RootStyle>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default MainLayout;
