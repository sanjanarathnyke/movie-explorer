import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';
import MovieCardSkeleton from '../MovieCard/MovieCardSkeleton';

export default function MovieGrid({ movies, loading = false, skeletonCount = 10 }) {
  if (loading && (!movies || movies.length === 0)) {
    // Full skeleton grid while first page loads
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Grid item xs={6} sm={4} md={3} lg={3} key={`sk-${i}`}>
            <MovieCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {movies.map((movie) => (
        <Grid item xs={6} sm={4} md={3} lg={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
      {/* Append skeleton rows at bottom while loading more pages */}
      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <Grid item xs={6} sm={4} md={3} lg={3} key={`sk-more-${i}`}>
            <MovieCardSkeleton />
          </Grid>
        ))}
    </Grid>
  );
}
