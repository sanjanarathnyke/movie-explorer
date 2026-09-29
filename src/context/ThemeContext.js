import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext({ toggleTheme: () => {}, mode: 'dark' });

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary:   { main: '#F5C518', light: '#FFD54F', dark: '#C79B00', contrastText: '#0a0a0a' },
          secondary: { main: '#E53935', light: '#FF6F60', dark: '#AB000D', contrastText: '#fff' },
          background: { default: '#0D0D0D', paper: '#161616' },
          text:       { primary: '#F2F2F2', secondary: '#9E9E9E' },
          divider:    'rgba(255,255,255,0.08)',
        }
      : {
          primary:   { main: '#1A1A2E', light: '#2d2d5e', dark: '#0a0a1a', contrastText: '#F5C518' },
          secondary: { main: '#E53935', light: '#FF6F60', dark: '#AB000D', contrastText: '#fff' },
          background: { default: '#F5F5F5', paper: '#FFFFFF' },
          text:       { primary: '#1A1A2E', secondary: '#555' },
          divider:    'rgba(0,0,0,0.08)',
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h3: { fontWeight: 800, letterSpacing: '-0.5px' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    body1: { lineHeight: 1.8 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #F5C518; border-radius: 3px; }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: mode === 'dark'
            ? 'rgba(10,10,10,0.92)'
            : theme.palette.primary.main,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(245,197,24,0.15)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: 'none',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #F5C518 0%, #FFD54F 100%)',
          color: '#0a0a0a',
          '&:hover': { background: 'linear-gradient(135deg, #e6b800 0%, #F5C518 100%)', boxShadow: '0 4px 20px rgba(245,197,24,0.35)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: mode === 'dark' ? '#1a1a1a' : '#fff',
          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: mode === 'dark'
              ? '0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,197,24,0.2)'
              : '0 16px 40px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
        colorDefault: {
          background: mode === 'dark' ? 'rgba(245,197,24,0.12)' : 'rgba(26,26,46,0.08)',
          color: mode === 'dark' ? '#F5C518' : '#1A1A2E',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F5C518',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#F5C518' },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
