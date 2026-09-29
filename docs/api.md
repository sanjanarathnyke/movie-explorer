# Movie Explorer App - API Specification

## API Provider

Use The Movie Database (TMDb) API.

API documentation:

https://developers.themoviedb.org/3

The application must use TMDb as the movie data source.

---

## API Configuration

Store the TMDb API key in an environment variable.

For Create React App:

REACT_APP_TMDB_API_KEY=YOUR_API_KEY

Never hard-code the API key inside React components.

Never commit the .env file to Git.

---

## Axios

Use Axios for all HTTP requests.

Create a dedicated API service:

src/services/tmdbApi.js

Do not make direct Axios requests inside MovieCard, Home, MovieDetails, or other presentation components.

---

## Base URL

Use:

https://api.themoviedb.org/3

Configure Axios so API requests can reuse the base URL.

---

## Image URLs

TMDb returns poster paths instead of complete image URLs.

Use:

https://image.tmdb.org/t/p/

Common poster sizes:

w342
w500
original

Example:

https://image.tmdb.org/t/p/w500/{poster_path}

Create a reusable helper if required.

---

# Required API Operations

## 1. Trending Movies

Use:

GET /trending/movie/week

Purpose:

Retrieve currently trending movies.

Use this data for the Trending Movies section on the Home page.

---

## 2. Search Movies

Use:

GET /search/movie

Required parameters:

query
page

Example:

/search/movie?query=inception&page=1

Search results must support pagination.

The frontend must keep track of the current page.

---

## 3. Movie Details

Use:

GET /movie/{movie_id}

Purpose:

Retrieve detailed movie information.

Required information includes:

- title
- poster_path
- overview
- release_date
- vote_average
- genres
- runtime

---

## 4. Movie Credits

Use:

GET /movie/{movie_id}/credits

Purpose:

Retrieve cast information.

Display relevant cast members on the Movie Details page.

---

## 5. Movie Videos

Use:

GET /movie/{movie_id}/videos

Purpose:

Retrieve trailers and other videos.

Prefer YouTube trailer videos when available.

If a suitable trailer is not available, do not display a broken video component.

---

# API Service

Create reusable functions inside:

src/services/tmdbApi.js

Recommended functions:

getTrendingMovies()

searchMovies(query, page)

getMovieDetails(movieId)

getMovieCredits(movieId)

getMovieVideos(movieId)

Do not duplicate API request code.

---

# API State

API-related state should support:

- loading
- data
- error
- pagination

Example:

loading
movies
error
currentPage
totalPages
hasMore

---

# Search Pagination

Search results must support infinite scrolling.

When the user reaches the bottom of the search results:

1. Check whether another page exists.
2. Check that a request is not already running.
3. Request the next page.
4. Append new results to existing results.
5. Update the current page.

Do not replace existing search results when loading another page.

---

# Error Handling

Handle:

- Network errors
- Invalid API responses
- Empty results
- Missing movie information
- Missing poster images
- Missing trailers
- API rate-limit/errors

Never display raw API errors to users.

Convert API failures into user-friendly messages.

---

# Missing Images

If poster_path is null:

Use a reusable placeholder image or MUI fallback UI.

Do not generate broken image URLs.

---

# API Security

The TMDb API key must only be stored in the environment configuration.

Do not place the key in:

- Components
- Context files
- Git repository
- Documentation
- README screenshots
- Hard-coded API URLs

---

# API Architecture

Use this flow:

Component
    ↓
Context / Hook
    ↓
TMDb API Service
    ↓
Axios
    ↓
TMDb API

Presentation components must not directly manage API configuration.