import React, { useState } from 'react';
import FavoritesContext from './FavoritesContext';

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [baskets, setBaskets] = useState([])

  const value = {
    favorites,
    setFavorites,
    baskets,
    setBaskets
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
