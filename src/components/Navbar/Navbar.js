import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar,
  Tooltip, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Divider,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleDrawerClose = () => setDrawerOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleDrawerClose();
  };

  /* ── Mobile Drawer ──────────────────────── */
  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerClose}
      PaperProps={{
        sx: {
          width: 260,
          background: '#111 !important',
          backgroundColor: '#111 !important',
          backgroundImage: 'none !important',
          borderLeft: '1px solid rgba(245,197,24,0.15)',
          color: '#fff',
        },
      }}
    >
      {/* Drawer header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MovieIcon sx={{ color: '#F5C518', fontSize: 22 }} />
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#F5C518 !important' }}>
            MovieExplorer
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleDrawerClose} sx={{ color: 'rgba(255,255,255,0.7) !important' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

      {/* User info */}
      {user && (
        <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#F5C518', color: '#0a0a0a', fontWeight: 700, fontSize: '0.9rem' }}>
            {user.username?.[0]?.toUpperCase()}
          </Avatar>
          <Typography sx={{ color: '#fff !important', fontWeight: 600, fontSize: '0.9rem' }}>
            {user.username}
          </Typography>
        </Box>
      )}

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Nav items */}
      <List sx={{ pt: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={handleDrawerClose}
            sx={{
              borderLeft: isActive('/') ? '3px solid #F5C518' : '3px solid transparent',
              color: `${isActive('/') ? '#F5C518' : 'rgba(255,255,255,0.85)'} !important`,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}><HomeIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/favorites"
            onClick={handleDrawerClose}
            sx={{
              borderLeft: isActive('/favorites') ? '3px solid #F5C518' : '3px solid transparent',
              color: `${isActive('/favorites') ? '#F5C518' : 'rgba(255,255,255,0.85)'} !important`,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}><FavoriteIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Favorites" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit' }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => { toggleTheme(); handleDrawerClose(); }}
            sx={{
              color: 'rgba(255,255,255,0.85) !important',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </ListItemIcon>
            <ListItemText
              primary={mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit' }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mt: 'auto' }} />

      {/* Logout / Login */}
      <Box sx={{ p: 2 }}>
        {user ? (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              color: 'rgba(255,255,255,0.85) !important',
              borderColor: 'rgba(255,255,255,0.3) !important',
              '&:hover': { borderColor: '#f44336 !important', color: '#f44336 !important', bgcolor: 'rgba(244,67,54,0.08)' },
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            component={Link}
            to="/login"
            onClick={handleDrawerClose}
            sx={{ background: '#F5C518 !important', color: '#0a0a0a !important', '&:hover': { background: '#e6b800 !important' } }}
          >
            Login
          </Button>
        )}
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ overflow: 'hidden' }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1.5, sm: 2 } }}>

          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.75, textDecoration: 'none', flexGrow: 1, minWidth: 0 }}
          >
            <MovieIcon sx={{ color: '#F5C518', fontSize: { xs: 22, sm: 28 }, flexShrink: 0 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(90deg, #F5C518 0%, #FFD54F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              MovieExplorer
            </Typography>
          </Box>

          {/* ── Desktop Nav (md+) ── */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <Button startIcon={<HomeIcon sx={{ fontSize: 16 }} />} component={Link} to="/" sx={navBtnSx('/')}>
              Home
            </Button>
            <Button startIcon={<FavoriteIcon sx={{ fontSize: 16 }} />} component={Link} to="/favorites" sx={navBtnSx('/favorites')}>
              Favorites
            </Button>

            <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton onClick={toggleTheme} size="small" sx={{ mx: 0.5, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#F5C518' } }}>
                {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#F5C518', color: '#0a0a0a', fontSize: '0.8rem', fontWeight: 700 }}>
                  {user.username?.[0]?.toUpperCase()}
                </Avatar>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>
                  {user.username}
                </Typography>
                <Tooltip title="Logout">
                  <IconButton size="small" onClick={() => { logout(); navigate('/login'); }} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'error.main' } }}>
                    <LogoutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Button startIcon={<LoginIcon />} variant="contained" size="small" component={Link} to="/login" sx={{ ml: 1 }}>
                Login
              </Button>
            )}
          </Box>

          {/* ── Mobile Nav (xs–sm): just hamburger menu ── */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            {user && (
              <Avatar sx={{ width: 30, height: 30, bgcolor: '#F5C518', color: '#0a0a0a', fontSize: '0.75rem', fontWeight: 700, mr: 0.5 }}>
                {user.username?.[0]?.toUpperCase()}
              </Avatar>
            )}
            <IconButton
              size="small"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#F5C518' } }}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {mobileDrawer}
    </>
  );
}
