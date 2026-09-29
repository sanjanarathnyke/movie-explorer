# Movie Explorer

A responsive movie discovery web application built with React.

**Live Site:** https://movie-explorer-zwny.vercel.app/

## Features

- Log in with username and password (frontend-only)
- Search movies using the TMDb API
- View trending movies
- View detailed movie information (poster, title, release date, rating, overview, genres, runtime, cast, trailer)
- Add/remove movies from favorites (stored in localStorage)
- Light and dark theme toggle (persisted in localStorage)
- Responsive design for mobile, tablet, and desktop

## Technology Stack

- React
- Material UI (MUI)
- React Router
- Axios
- TMDb API
- localStorage

## Setup

```bash
npm install
npm start
```

Create a `.env` file with your TMDb credentials:

```
REACT_APP_TMDB_API_KEY=your_api_key
REACT_APP_TMDB_ACCESS_TOKEN=your_access_token
```

## Scripts

- `npm start` — Run development server
- `npm run build` — Build for production
- `npm test` — Launch test runner
