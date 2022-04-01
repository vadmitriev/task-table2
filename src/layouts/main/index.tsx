import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, CssBaseline, styled, ThemeProvider } from '@mui/material';
import { Header, Sidebar } from '@/components';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  flexDirection: 'column'
});

const theme = createTheme();

const MainLayout = () => {
  const [isOpen, setOpen] = useState(false);

  const handleSidebar = () => {
    setOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <RootStyle>
        <CssBaseline />
        <Header toggleSidebar={handleSidebar} />
        <Sidebar open={isOpen} toggle={handleSidebar} />
        <Outlet />
      </RootStyle>
    </ThemeProvider>
  );
};

export default MainLayout;
