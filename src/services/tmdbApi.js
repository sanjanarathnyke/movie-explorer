import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const getTrendingMovies = () => api.get('/trending/movie/week');
export const searchMovies = (query, page = 1) => api.get('/search/movie', { params: { query, page } });
export const getMovieDetails = (movieId) => api.get(`/movie/${movieId}`);
export const getMovieCredits = (movieId) => api.get(`/movie/${movieId}/credits`);
export const getMovieVideos = (movieId) => api.get(`/movie/${movieId}/videos`);

export default api;
