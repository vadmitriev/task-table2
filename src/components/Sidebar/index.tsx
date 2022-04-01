import React from 'react';

import { styled } from '@mui/material';
import { Drawer as MuiDrawer, DrawerProps } from '@mui/material';

import ListItems from '@/components/Sidebar/ListItems';

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

const drawerWidth = 200;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerProps>(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      top: '70px',
      whiteSpace: 'nowrap',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      overflowX: 'hidden',
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(0)
      })
    }
  })
);

const Sidebar: React.FC<SidebarProps> = ({ open, toggle }) => {
  return (
    <Drawer variant="permanent" open={open} onClose={toggle} anchor="left">
      <ListItems />
    </Drawer>
  );
};

export default Sidebar;
