import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MovieModal from "../components/MovieModal";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./ShowItemPage.css";
import { Stack } from "@mui/material";
function ShowItemPage() {
  const params = useParams();
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedOverview, setSelectedOverview] = useState("");

  const handleOpen = (overview) => {
    setSelectedOverview(overview.text);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [movies, setMovies] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  console.log(params, "params");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/collection?query=${params.name}&include_adult=false&language=en-US&page=1`,

    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
    },
  };
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  console.log(movies, "222222222222222222");
  return (
    <Stack mt="90px">
      {movies.map((movie) => {
        console.log(movie.overview, "22222222222overview");
        const {
          name = "",
          title,
          // release_date,
          vote_average,
          overview,
          // media_type,
          // id,
          backdrop_path,
        } = movie;
        let imageURL = `https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces${backdrop_path}`;

        if (
          imageURL ===
          "https://media.themoviedb.org/t/p/w1920_and_h1080_multi_facesnull"
        ) {
          imageURL = "/image/videoImage.jpg";
        }
        console.log(overview, "imageURL");
        return (
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Grid bgcolor="red" container spacing={2}>
              <Grid item xs={6} md={8}>
                <Card sx={{ Width: 200, Height: 200 }}>
                  <CardMedia
                    height="150"
                    component="img"
                    className="poster"
                    // key={id}
                    src={imageURL}
                    alt={title || "movie image"}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie?.name?.length > 0 ? name : title}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button onClick={handleOpen} size="small">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
                <MovieModal
                  open={open}
                  onClose={handleClose}
                  overview={selectedOverview}
                />
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Stack>
  );
}

export default ShowItemPage;
