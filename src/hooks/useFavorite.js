const useFavorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);

  const toggleFavorite = (id) => {
    // const newFavorites = favorites.includes(id)
    //   ? favorites.filter((favorite) => favorite !== id)
    //   : [...favorites, id];
    // setFavorites(newFavorites);
    // localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isMovieFavorite = (id) => {
    return favorites.includes(id);
  };

  return {
    toggleFavorite,
    isMovieFavorite,
  };
};
