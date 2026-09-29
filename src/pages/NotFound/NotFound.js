import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5" mb={3}>Page not found.</Typography>
      <Button component={Link} to="/" variant="contained">Back to Home</Button>
    </Box>
  );
}
