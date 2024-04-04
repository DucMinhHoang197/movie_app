import React from "react";

import useFavorite from "../hooks/useFavorite";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Favorite.css";

const FavoritePage = () => {
  const { toggleFavorite, isMovieFavorite } = useFavorite();
  const data = localStorage.getItem("favorites");
  const dataObject = JSON.parse(data) || {};
  console.log(dataObject, "data");

  return (
    <div className="container">
      {Object.keys(dataObject).length === 0 && <p>No favorite movie</p>}

      {Object.keys(dataObject).map((key) => {
        const movie = dataObject[key];
        return (
          <Card key={key} className="card">
            <CardMedia
              component="img"
              height="140"
              image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title || "movie image"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {movie.title || movie.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Remove</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default FavoritePage;
