import React, { useState } from 'react';
import FavoritesContext from './FavoritesContext';

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false)

  const value = {
    favorites,
    setFavorites,
    isInFavorites,
    setIsInFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
