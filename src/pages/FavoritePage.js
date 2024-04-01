import React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./Favorite.css";

const FavoritePage = () => {
  const data = localStorage.getItem("favorites");
  const dataObject = JSON.parse(data) || {};
  console.log(dataObject, "data");

  return (
    <div className="container">
      {Object.keys(dataObject).length === 0 && <p>No favorite movie</p>}
      <ImageList sx={{}} cols={4} rowHeight={300}>
        {Object.keys(dataObject).map((key) => {
          const movie = dataObject[key];
          return (
            <ImageListItem key={key} className="image-list-item">
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title || "movie image"}
              />
              <p className="title">{movie.title || movie.name}</p>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
};

export default FavoritePage;
