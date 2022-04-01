import React from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';
import { styled } from '@mui/material';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: '30%',
  left: '50%',
  zIndex: 9999,
  width: '100%'
});

const Loader: React.FC<CircularProgressProps> = ({ sx }) => {
  return (
    <LoaderWrapper>
      <CircularProgress sx={{ ...sx }} />
    </LoaderWrapper>
  );
};

export default Loader;
