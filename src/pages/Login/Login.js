import React, { useState } from 'react';
import {
  Box, Paper, TextField, Button, Typography,
  InputAdornment, IconButton, Alert, Divider,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [error, setError]           = useState('');
  const navigate                    = useNavigate();
  const { login }                   = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) { setError('Both fields are required.'); return; }

    if (login(username, password)) { navigate('/'); }
    else { setError('Invalid username or password.'); }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(245,197,24,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(229,57,53,0.07) 0%, transparent 50%)',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Brand */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'inline-flex', p: 1.5, bgcolor: 'rgba(245,197,24,0.1)', borderRadius: 3, mb: 2 }}>
            <MovieIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            MovieExplorer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to discover and save movies
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            autoComplete="username"
            InputLabelProps={{ shrink: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#F5C518' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            placeholder="Password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
            InputLabelProps={{ shrink: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#F5C518' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((s) => !s)} edge="end" sx={{ color: '#F5C518' }}>
                    {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{ mt: 3, py: 1.4, fontSize: '1rem', letterSpacing: '0.02em' }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
