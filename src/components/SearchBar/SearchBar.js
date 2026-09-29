import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Box, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [query, setQuery]       = useState(initialValue);
  const [pending, setPending]   = useState(false);

  // Debounce: fire search 400ms after user stops typing
  useEffect(() => {
    setPending(true);
    const timer = setTimeout(() => {
      onSearch(query.trim());
      setPending(false);
    }, 400);
    return () => { clearTimeout(timer); setPending(false); };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClear = () => { setQuery(''); onSearch(''); };

  const handleSubmit = (e) => { e.preventDefault(); onSearch(query.trim()); };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 620, mx: 'auto', my: 2 }}>
      <TextField
        fullWidth
        label="Search movies…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. Interstellar, Spider-Man…"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {pending && query
                ? <CircularProgress size={18} thickness={5} sx={{ color: 'primary.main' }} />
                : <SearchIcon sx={{ color: query ? 'primary.main' : 'text.secondary' }} />
              }
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                aria-label="clear search"
                size="small"
                edge="end"
                sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: {
            borderRadius: 3,
            fontSize: '1rem',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            transition: 'box-shadow 0.2s',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(245,197,24,0.15)',
            },
          },
        }}
      />
    </Box>
  );
}
