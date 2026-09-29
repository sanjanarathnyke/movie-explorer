import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
      <CircularProgress />
      <Typography mt={2}>Loading movies...</Typography>
    </Box>
  );
}
