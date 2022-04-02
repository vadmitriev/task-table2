import React from 'react';
import {
  Box,
  Container,
  Typography,
  styled,
  Grid,
  Paper,
  Card,
} from '@mui/material';

import {
  transformDataForAreaChart,
  transformDataForLineChart,
} from '@/utils/transformData';
import useDataQuery from '@/hooks/useDataQuery';
import { LineChart, Spinner } from '@/components';

const Style = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(2),
  },
}));

const ChartPage = () => {
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

  const { dates, series } = transformDataForAreaChart(data);

  const { houses, weathers, plants, prices } =
    transformDataForLineChart(data);

  // console.log('plants', plants);
  // console.log('houses', houses);

  return (
    <Style>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, pt: 4 }}>
          <Typography variant="h4">
            Графики энергопотребления
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          <Grid item sm={12} md={5}>
            <Card sx={{ padding: 2 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center' }}
              >
                Потребление жилых домов от температуры
                воздуха
              </Typography>
              <LineChart
                series={houses}
                xAxisData={weathers}
                yTitle="Потребление"
                xTitle="Температура"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={5}>
            <Card sx={{ padding: 2 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center' }}
              >
                Потребление заводов от цены на кирпич
              </Typography>
              <LineChart
                series={plants}
                xAxisData={prices}
                yTitle="Потребление"
                xTitle="Цена на кирпич"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={10}>
            <Card sx={{ padding: 2 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center' }}
              >
                Потребление жилых домов от температуры
                воздуха
              </Typography>
              <LineChart
                series={series}
                xAxisData={dates}
                yTitle="Потребление"
                xTitle="Цена на кирпич"
                stacked={true}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Style>
  );
};

export default ChartPage;
