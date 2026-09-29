import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, CardActions,
  IconButton, Chip, Box, Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useMovie } from '../../context/MovieContext';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useMovie();
  const fav = isFavorite(movie.id);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : `https://placehold.co/342x513/1a1a1a/555?text=No+Poster`;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Poster */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={poster}
          alt={movie.title}
          sx={{
            height: 300,
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
        {/* Rating badge */}
        {rating && (
          <Chip
            icon={<StarIcon sx={{ fontSize: 13, color: '#F5C518 !important' }} />}
            label={rating}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.75)',
              color: '#F5C518',
              fontWeight: 700,
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(245,197,24,0.3)',
              fontSize: '0.7rem',
              height: 22,
            }}
          />
        )}
      </Box>

      {/* Info */}
      <CardContent sx={{ flexGrow: 1, pb: 0, pt: 1.5 }}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          noWrap
          title={movie.title}
          sx={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.3 }}
        >
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
          {year}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions disableSpacing sx={{ pt: 0, px: 1 }}>
        <Tooltip title={fav ? 'Remove from favourites' : 'Add to favourites'}>
          <IconButton
            aria-label={fav ? 'remove favorite' : 'add favorite'}
            size="small"
            onClick={(e) => { e.stopPropagation(); fav ? removeFavorite(movie.id) : addFavorite(movie); }}
            sx={{
              color: fav ? 'error.main' : 'text.secondary',
              transition: 'transform 0.2s, color 0.2s',
              '&:hover': { transform: 'scale(1.2)', color: fav ? 'error.light' : 'error.main' },
            }}
          >
            {fav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: 0.5, fontSize: '0.72rem', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          More info →
        </Typography>
      </CardActions>
    </Card>
  );
}
