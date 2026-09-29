import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { getTrendingMovies } from '../../services/tmdbApi';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function TrendingMovies() {
  const [movies, setMovies]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then((res) => { setMovies(res.data.results || []); setError(null); })
      .catch(() => setError('Failed to load trending movies.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
        <WhatshotIcon sx={{ color: 'error.main' }} />
        Trending This Week
      </Typography>
      {error
        ? <ErrorMessage message={error} onRetry={() => { setLoading(true); getTrendingMovies().then((res) => { setMovies(res.data.results || []); setError(null); }).catch(() => setError('Failed to load trending movies.')).finally(() => setLoading(false)); }} />
        : <MovieGrid movies={movies} loading={loading} skeletonCount={10} />
      }
    </Box>
  );
}
