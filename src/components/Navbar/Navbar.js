import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navBtnSx = (path) => ({
    color: isActive(path) ? '#F5C518' : 'rgba(255, 255, 255, 0.7)',
    fontWeight: isActive(path) ? 700 : 500,
    borderBottom: isActive(path) ? '2px solid' : '2px solid transparent',
    borderColor: isActive(path) ? '#F5C518' : 'transparent',
    borderRadius: 0,
    px: 1.5,
    py: 2.5,
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: 'color 0.2s, border-color 0.2s',
    '&:hover': { color: '#F5C518', background: 'transparent' },
  });

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 0.5, minHeight: { xs: 56, sm: 64 } }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            textDecoration: 'none', flexGrow: 1,
          }}
        >
          <MovieIcon sx={{ color: '#F5C518', fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #F5C518 0%, #FFD54F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
              fontSize: '1.2rem',
            }}
          >
            MovieExplorer
          </Typography>

        </Box>

        {/* Nav links */}
        <Button startIcon={<HomeIcon sx={{ fontSize: 16 }} />} component={Link} to="/" sx={navBtnSx('/')}>
          Home
        </Button>
        <Button startIcon={<FavoriteIcon sx={{ fontSize: 16 }} />} component={Link} to="/favorites" sx={navBtnSx('/favorites')}>
          Favorites
        </Button>

        {/* Theme toggle */}
        <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
          <IconButton
            onClick={toggleTheme}
            aria-label="toggle theme"
            size="small"
            sx={{
              mx: 0.5,
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: '#F5C518' },
            }}
          >
            {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Auth */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            <Avatar
              sx={{
                width: 32, height: 32,
                bgcolor: 'primary.main', color: 'primary.contrastText',
                fontSize: '0.8rem', fontWeight: 700,
              }}
            >
              {user.username?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.82rem' }}>
              {user.username}
            </Typography>
            <Tooltip title="Logout">
              <IconButton
                size="small"
                onClick={() => { logout(); navigate('/login'); }}
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'error.main' } }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Button
            startIcon={<LoginIcon />}
            variant="contained"
            size="small"
            component={Link}
            to="/login"
            sx={{ ml: 1 }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
