import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movieExplorerFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastSearch, setLastSearch] = useState(() => localStorage.getItem('movieExplorerLastSearch') || '');

  useEffect(() => {
    localStorage.setItem('movieExplorerFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('movieExplorerLastSearch', lastSearch);
  }, [lastSearch]);

  const addFavorite = (movie) => {
    setFavorites((prev) => (prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]));
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
