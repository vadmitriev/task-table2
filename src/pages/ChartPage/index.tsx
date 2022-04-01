import React from 'react';
import { Box, Container, Typography, styled, Grid } from '@mui/material';

import Chart from 'react-apexcharts';
import { chartData } from './chartData';

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

const ChartPage = () => {
  return (
    <Style>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, pt: 4 }}>
          <Typography variant="h4">Графики энергопотребления</Typography>
        </Box>
        <Grid item xs={12}>
          <Chart {...chartData} />
        </Grid>
      </Container>
    </Style>
  );
};

export default ChartPage;
