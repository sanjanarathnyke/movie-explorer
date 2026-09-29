import React from 'react';
import { Alert, Button, Box } from '@mui/material';

export default function ErrorMessage({ message = 'Unable to load movies right now. Please try again.', onRetry }) {
  return (
    <Box my={2}>
      <Alert severity="error">{message}</Alert>
      {onRetry && (
        <Box mt={1}>
          <Button variant="contained" onClick={onRetry}>Retry</Button>
        </Box>
      )}
    </Box>
  );
}
