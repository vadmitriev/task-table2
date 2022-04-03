import { styled } from '@mui/material';

export const PageStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  marginLeft: '5%',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(2),
  },
}));
