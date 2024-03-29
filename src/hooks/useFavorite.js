import { useEffect, useState } from "react";
const useFavorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);

  const toggleFavorite = (movie) => {
    const newFavorites = favorites.includes(movie)
      ? favorites.filter((favorite) => favorite !== movie)
      : [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isMovieFavorite = (id) => {
    return favorites.includes(id);
  };

  return {
    toggleFavorite,
    isMovieFavorite,
  };
};
export default useFavorite;
