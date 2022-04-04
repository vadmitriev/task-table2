import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { PageStyle } from '@/pages/page.style';

const NotFoundPage = ({ text = '' }) => {
  const theme = useTheme();

  return (
    <PageStyle>
      <Container sx={{ paddingTop: theme.spacing(10) }}>
        <Box
          sx={{ maxWidth: 550, margin: 'auto', textAlign: 'center' }}
        >
          <Typography
            variant="h3"
            paragraph
            sx={{ paddingBottom: theme.spacing(3) }}
          >
            {text}
          </Typography>
          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            На главную
          </Button>
        </Box>
      </Container>
    </PageStyle>
  );
};

export default NotFoundPage;
