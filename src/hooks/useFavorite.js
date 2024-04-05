import { useEffect, useState } from "react";
const useFavorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);
  const isMovieFavorite = (id) => favorites[id];

  const toggleFavorite = ({ id, name, title, backdrop_path, media_type }) => {
    const newFavorites = { ...favorites };

    if (isMovieFavorite(id)) {
      delete newFavorites[id];
    } else {
      newFavorites[id] = { id, name, title, backdrop_path, media_type };
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return {
    toggleFavorite,
    isMovieFavorite,
  };
};
export default useFavorite;
