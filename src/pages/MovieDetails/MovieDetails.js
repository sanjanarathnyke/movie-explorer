import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Chip, Button, Grid, IconButton,
  Stack, Divider, Avatar, Tooltip, Skeleton, Fade,
  LinearProgress, Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TheatersIcon from '@mui/icons-material/Theaters';
import { getMovieDetails, getMovieCredits, getMovieVideos } from '../../services/tmdbApi';
import { useMovie } from '../../context/MovieContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const IMG_BASE = 'https://image.tmdb.org/t/p';

/* ── Skeleton while loading ─────────────────────────────────── */
function DetailsSkeleton() {
  const sk = (w, h, variant = 'rounded') => (
    <Skeleton variant={variant} width={w} height={h} animation="wave"
      sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
  );
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {sk('10%', 36)}
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} md={4}>{sk('100%', 480)}</Grid>
        <Grid item xs={12} md={8}>
          {sk('70%', 48)}
          <Stack direction="row" spacing={1} my={2}>{sk(80, 32)}{sk(80, 32)}{sk(80, 32)}</Stack>
          {[100, 95, 90, 60].map((w, i) => <Skeleton key={i} variant="text" width={`${w}%`} height={20} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.06)', mb: 0.5 }} />)}
        </Grid>
      </Grid>
    </Box>
  );
}

/* ── Cast card ───────────────────────────────────────────────── */
function CastCard({ member }) {
  const photo = member.profile_path
    ? `${IMG_BASE}/w185${member.profile_path}`
    : null;
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        p: 1.5, gap: 1, borderRadius: 3, textAlign: 'center',
        border: '1px solid', borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' },
        minWidth: 110,
      }}
    >
      <Avatar
        src={photo}
        alt={member.name}
        sx={{ width: 80, height: 80, border: '2px solid', borderColor: 'primary.main' }}
      >
        {member.name?.[0]}
      </Avatar>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', lineHeight: 1.3, fontSize: '0.78rem' }}>
          {member.name}
        </Typography>
        {member.character && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem', mt: 0.25 }}>
            {member.character}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useMovie();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setMovie(null);
    Promise.all([getMovieDetails(id), getMovieCredits(id), getMovieVideos(id)])
      .then(([details, cred, vid]) => {
        setMovie(details.data);
        setCredits(cred.data);
        const trailer =
          vid.data.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ||
          vid.data.results?.[0];
        setVideo(trailer || null);
        setError(null);
      })
      .catch(() => setError('Failed to load movie details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DetailsSkeleton />;
  if (error || !movie) return <ErrorMessage message={error || 'Movie not found.'} onRetry={() => navigate('/')} />;

  const poster    = movie.poster_path    ? `${IMG_BASE}/w500${movie.poster_path}`    : null;
  const backdrop  = movie.backdrop_path  ? `${IMG_BASE}/w1280${movie.backdrop_path}` : null;
  const fav       = isFavorite(movie.id);
  const rating    = movie.vote_average   ? movie.vote_average.toFixed(1)             : 'N/A';
  const cast      = credits?.cast?.slice(0, 12) || [];
  const directors = credits?.crew?.filter((c) => c.job === 'Director') || [];

  return (
    <Fade in timeout={400}>
      <Box>
        {/* ── Backdrop hero ─────────────────────────── */}
        {backdrop && (
          <Box
            sx={{
              position: 'relative', height: { xs: 200, md: 380 },
              backgroundImage: `url(${backdrop})`,
              backgroundSize: 'cover', backgroundPosition: 'center top',
              '&::after': {
                content: '""', position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(13,13,13,0.2) 0%, rgba(13,13,13,0.95) 100%)',
              },
            }}
          />
        )}

        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', mt: backdrop ? -10 : 0, position: 'relative', zIndex: 1 }}>
          {/* Back button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 3, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            Back
          </Button>

          {/* ── Main info grid ────────────────────── */}
          <Grid container spacing={4} alignItems="flex-start">
            {/* Poster */}
            <Grid item xs={12} sm={5} md={3}>
              <Box
                component="img"
                src={poster || `https://placehold.co/500x750/1a1a1a/555?text=No+Poster`}
                alt={movie.title}
                sx={{
                  width: '100%', borderRadius: 3,
                  boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
            </Grid>

            {/* Details */}
            <Grid item xs={12} sm={7} md={9}>
              <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15, mb: 1 }}>
                {movie.title}
              </Typography>

              {movie.tagline && (
                <Typography variant="subtitle1" color="primary.main" sx={{ fontStyle: 'italic', mb: 2 }}>
                  "{movie.tagline}"
                </Typography>
              )}

              {/* Meta chips */}
              <Stack direction="row" spacing={1} mb={2.5} flexWrap="wrap" gap={1}>
                <Chip
                  icon={<StarIcon sx={{ fontSize: 14, color: '#F5C518 !important' }} />}
                  label={`${rating} / 10`}
                  size="small"
                  sx={{ bgcolor: 'rgba(245,197,24,0.12)', color: '#F5C518', fontWeight: 700 }}
                />
                {movie.release_date && (
                  <Chip
                    icon={<CalendarTodayIcon sx={{ fontSize: 13 }} />}
                    label={movie.release_date.slice(0, 4)}
                    size="small"
                  />
                )}
                {movie.runtime > 0 && (
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 13 }} />}
                    label={`${movie.runtime} min`}
                    size="small"
                  />
                )}
                {movie.genres?.map((g) => (
                  <Chip key={g.id} label={g.name} size="small" variant="outlined" sx={{ borderColor: 'divider' }} />
                ))}
              </Stack>

              {/* Vote bar */}
              {movie.vote_count > 0 && (
                <Box mb={2.5}>
                  <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
                    User score — {movie.vote_count?.toLocaleString()} votes
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(movie.vote_average / 10) * 100}
                    sx={{
                      height: 6, borderRadius: 3,
                      bgcolor: 'rgba(255,255,255,0.08)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #F5C518, #FFD54F)',
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {/* Overview */}
              <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.85 }}>
                {movie.overview || 'No overview available.'}
              </Typography>

              {/* Director */}
              {directors.length > 0 && (
                <Typography variant="body2" color="text.secondary" mb={1}>
                  <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>Director: </Box>
                  {directors.map((d) => d.name).join(', ')}
                </Typography>
              )}

              {/* Favourite button */}
              <Button
                startIcon={fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                variant={fav ? 'contained' : 'outlined'}
                color={fav ? 'error' : 'inherit'}
                onClick={() => (fav ? removeFavorite(movie.id) : addFavorite(movie))}
                sx={{ mt: 1, borderRadius: 8 }}
              >
                {fav ? 'Saved to Favourites' : 'Add to Favourites'}
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* ── Cast section ──────────────────────── */}
          {cast.length > 0 && (
            <Box mb={4}>
              <Typography variant="h5" mb={2.5} sx={{ fontWeight: 700 }}>
                <TheatersIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                Cast
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: 2,
                }}
              >
                {cast.map((member) => (
                  <CastCard key={member.cast_id ?? member.id} member={member} />
                ))}
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 4 }} />

          {/* ── Trailer ───────────────────────────── */}
          {video && (
            <Box>
              <Typography variant="h5" mb={2} sx={{ fontWeight: 700 }}>Trailer</Typography>
              <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 3, overflow: 'hidden' }}>
                <iframe
                  title={video.name}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allowFullScreen
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
}
