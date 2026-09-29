import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

export default function MovieCardSkeleton() {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Poster skeleton */}
      <Skeleton variant="rectangular" height={300} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Title */}
        <Skeleton variant="text" width="85%" height={28} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.06)', mb: 0.5 }} />
        {/* Year */}
        <Skeleton variant="text" width="40%" height={20} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.06)', mb: 1 }} />
        {/* Rating chip */}
        <Skeleton variant="rounded" width={90} height={24} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
      </CardContent>
      {/* Actions */}
      <Box sx={{ px: 1, pb: 1 }}>
        <Skeleton variant="circular" width={32} height={32} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
      </Box>
    </Card>
  );
}
