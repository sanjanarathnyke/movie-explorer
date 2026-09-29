import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import SearchBar from '../../components/SearchBar/SearchBar';
import TrendingMovies from '../../components/TrendingMovies/TrendingMovies';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { searchMovies } from '../../services/tmdbApi';
import { useMovie } from '../../context/MovieContext';

export default function Home() {
  const { lastSearch, setLastSearch } = useMovie();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(lastSearch || '');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const performSearch = useCallback((q, p = 1) => {
    if (!q.trim()) {
      setResults([]);
      setQuery('');
      setPage(1);
      setHasMore(false);
      setError(null);
      return;
    }
    setLoading(true);
    setQuery(q);
    setLastSearch(q);
    searchMovies(q, p)
      .then((res) => {
        const newResults = res.data.results || [];
        setResults((prev) => (p === 1 ? newResults : [...prev, ...newResults]));
        setHasMore(p < (res.data.total_pages || 1));
        setPage(p);
        setError(null);
      })
      .catch(() => setError('Failed to load search results.'))
      .finally(() => setLoading(false));
  }, [setLastSearch]);

  const handleSearch = (q) => performSearch(q, 1);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) performSearch(query, page + 1);
  }, [loading, hasMore, query, page, performSearch]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        loadMore();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          background: 'linear-gradient(90deg, #F5C518 0%, #FFD54F 60%, #fff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        Discover Movies
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        Search millions of movies, explore trending titles and save your favourites.
      </Typography>

      <SearchBar onSearch={handleSearch} initialValue={lastSearch} />

      {/* Trending shown only when no search is active */}
      {!query && <TrendingMovies />}

      {/* Search results */}
      {query && (
        <Fade in>
          <Box>
            <Typography variant="h5" mt={4} mb={1} sx={{ fontWeight: 700 }}>
              {loading && results.length === 0
                ? 'Searching…'
                : `Results for "${query}"`}
            </Typography>
            <MovieGrid movies={results} loading={loading} skeletonCount={10} />
            {!loading && results.length === 0 && !error && (
              <Typography mt={3} color="text.secondary">
                No results found for "{query}".
              </Typography>
            )}
            {error && <ErrorMessage message={error} onRetry={() => handleSearch(query)} />}
          </Box>
        </Fade>
      )}
    </Box>
  );
}
