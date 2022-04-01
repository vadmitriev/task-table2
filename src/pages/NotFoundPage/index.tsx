import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const NotFoundPage = ({ text = '' }) => {
  return (
    <RootStyle>
      <Container>
        <Box sx={{ maxWidth: 550, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            {text}
          </Typography>
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            На главную
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default NotFoundPage;
