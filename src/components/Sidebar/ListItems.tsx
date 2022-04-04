import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';

const ListItems = () => {
  const items = [
    {
      link: '/data',
      icon: <TableRowsOutlinedIcon />,
      text: 'Таблица',
    },
    {
      link: '/charts',
      icon: <InsertChartOutlinedTwoToneIcon />,
      text: 'Графики',
    },
  ];

  const { pathname } = useLocation();

  return (
    <List>
      {items.map((item) => {
        const isActive = item.link === pathname;
        return (
          <ListItemButton
            component={Link}
            to={item.link}
            key={item.text}
            selected={isActive}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default ListItems;
