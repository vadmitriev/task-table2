import React from 'react';
import Loader from '@/components/Loader';
import useDataQuery from '@/hooks/useDataQuery';
import { Container } from '@mui/material';

const MainPage = () => {
  const { isLoading, error, data } = useDataQuery(true);

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error) {
    throw error;
  }

  // return <div>mainpage</div>;
  return <Loader />;
};

export default MainPage;
