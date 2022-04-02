import React from 'react';
import { Spinner } from '@/components';
import useDataQuery from '@/hooks/useDataQuery';
import { Box, Container, styled, Typography } from '@mui/material';

const Style = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(2)
  }
}));

const MainPage = () => {
  const { isLoading, error, data } = useDataQuery(false);

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (error) {
    throw error;
  }

  // return <div>mainpage</div>;
  return (
    <Style>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, pt: 4 }}>
          <Typography variant="h4">Данные по энергопотреблению</Typography>
        </Box>
      </Container>
    </Style>
  );
};

export default MainPage;
