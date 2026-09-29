# Movie Explorer App - Project Specification

## Project Overview

Build a responsive Movie Explorer web application using React.

The application must allow users to:

- Log in with a username and password.
- Search for movies using the TMDb API.
- View movie search results.
- View trending movies.
- View detailed information about a movie.
- Save movies to a local favorites list.
- View saved favorite movies.
- Switch between light and dark themes.
- Persist the last searched movie using localStorage.

The application must use real-time movie data from TMDb.

---

## Technology Stack

Use the following technologies:

- React
- Create React App
- JavaScript
- Axios
- Material UI (MUI)
- React Router
- React Context API
- localStorage
- TMDb API

Do not introduce unnecessary libraries unless they are required.

---

## Application Structure

Use a component-based architecture.

Recommended structure:

src/
├── components/
│   ├── Navbar/
│   ├── SearchBar/
│   ├── MovieCard/
│   ├── MovieGrid/
│   ├── TrendingMovies/
│   ├── Loading/
│   └── ErrorMessage/
│
├── pages/
│   ├── Login/
│   ├── Home/
│   ├── MovieDetails/
│   └── Favorites/
│
├── context/
│   ├── MovieContext.js
│   ├── AuthContext.js
│   └── ThemeContext.js
│
├── services/
│   └── tmdbApi.js
│
├── hooks/
│
├── utils/
│
├── App.js
└── index.js

---

## Main Pages

The application must contain:

### Login

Allow the user to enter:

- Username
- Password

The login is only a frontend authentication interface for this assignment.

Do not implement a backend authentication system.

---

### Home

Display:

- Search bar
- Trending movies
- Search results
- Loading states
- Error states
- Empty states

---

### Movie Details

Display:

- Movie poster
- Title
- Release date
- Rating
- Overview
- Genres
- Runtime
- Cast
- Trailer/video when available
- Favorite button

---

### Favorites

Display movies saved by the user.

Users must be able to:

- Add movies to favorites.
- Remove movies from favorites.
- View saved movies after refreshing the page.

Favorites must be stored in localStorage.

---

## Search

Users must be able to search for movies.

Search results must:

- Come from TMDb.
- Display movie posters.
- Display movie titles.
- Display release years.
- Display ratings.
- Support pagination/infinite scrolling.
- Handle empty search results.

The last searched movie/search term must be saved in localStorage.

---

## Trending Movies

The Home page must display trending movies retrieved from TMDb.

Use the TMDb trending endpoint.

---

## Responsive Design

The application must follow a mobile-first responsive design.

The interface must work on:

- Mobile
- Tablet
- Desktop

Use MUI responsive utilities where appropriate.

---

## Code Requirements

Follow these rules:

1. Use reusable React components.
2. Do not duplicate API request logic.
3. Keep API requests inside the services layer.
4. Use Context API for shared application state.
5. Keep components focused on presentation and user interaction.
6. Use environment variables for API credentials.
7. Never hard-code the TMDb API key.
8. Provide loading states.
9. Provide user-friendly error messages.
10. Provide empty states where appropriate.
11. Keep the code readable and maintainable.
12. Do not add unnecessary dependencies.

---

## Important

Read all files inside `docs/` before implementing the application.

The documentation files define the required architecture, UI, API integration, routing, and development rules.

Do not change the required technology stack without a clear reason.