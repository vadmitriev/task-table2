import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
} from '@mui/material';

import useDataQuery from '@/hooks/useDataQuery';
import { LineChart, Spinner } from '@/components';

import {
  transformDataForAreaChart,
  transformDataForLineChart,
} from '@/utils/transformData';
import { PageStyle } from '@/pages/page.style';

const ChartPage = () => {
  const { isLoading, error, data } = useDataQuery(true);

  if (isLoading || !data) {
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

  return (
    <PageStyle>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, pt: 4 }}>
          <Typography variant="h4">
            Графики энергопотребления
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          <Grid item sm={12} md={5}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Потребление жилых домов от температуры воздуха
              </Typography>
              <LineChart series={houses} xAxisData={weathers} />
            </Card>
          </Grid>
          <Grid item sm={12} md={5}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Потребление заводов от цены на кирпич
              </Typography>
              <LineChart series={plants} xAxisData={prices} />
            </Card>
          </Grid>
          <Grid item sm={12} md={10}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Общее потребление
              </Typography>
              <LineChart series={series} xAxisData={dates} stacked />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </PageStyle>
  );
};

export default ChartPage;
