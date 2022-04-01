import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';

const ListItems = () => {
  const items = [
    {
      link: '/data',
      icon: <TableRowsOutlinedIcon />,
      text: 'Таблица'
    },
    {
      link: 'charts',
      icon: <InsertChartOutlinedTwoToneIcon />,
      text: 'График'
    }
  ];

  return (
    <List component="nav">
      {items.map((item) => (
        <ListItemButton component={Link} to={item.link} key={item.text}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default ListItems;
