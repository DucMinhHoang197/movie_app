import React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Favorite.css";

const FavoritePage = () => {
  const data = localStorage.getItem("favorites");
  let navigate = useNavigate();
  const dataObject = JSON.parse(data) || {};
  console.log(dataObject, "dataaaaaaaaaaaaaaaaa");
  const handleClickButton = (type, id) => {
    navigate(`/detail/${type}/${id}`);
  };
  const handleRemove = (key) => {
    const data = localStorage.getItem("favorites");
    const dataObject = JSON.parse(data) || {};

    if (dataObject.hasOwnProperty(key)) {
      delete dataObject[key];
      window.location.reload();
      localStorage.setItem("favorites", JSON.stringify(dataObject));
    }
  };
  return (
    <div className="container">
      {Object.keys(dataObject).length === 0 && <p>No favorite movie</p>}

      {Object.keys(dataObject).map((key) => {
        const movie = dataObject[key];

        return (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
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
                    <Button size="small" onClick={() => handleRemove(key)}>
                      Remove
                    </Button>
                    <Button
                      size="small"
                      onClick={() =>
                        handleClickButton(movie.media_type, movie.id)
                      }
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </div>
  );
};

export default FavoritePage;
