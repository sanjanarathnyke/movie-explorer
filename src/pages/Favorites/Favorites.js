import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { useMovie } from '../../context/MovieContext';

export default function Favorites() {
  const { favorites } = useMovie();

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Typography variant="h3" gutterBottom>My Favorites</Typography>
      {favorites.length === 0 ? (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="text.secondary">No favorite movies yet.</Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Discover Movies</Button>
        </Box>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Box>
  );
}
