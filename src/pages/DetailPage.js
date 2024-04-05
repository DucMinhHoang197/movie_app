/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "swiper/css";
import "./DetailPage.css";

function DetailPage() {
  const [movies, setMovies] = useState();
  const params = useParams();
  console.log(params.type, "type");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${params.type}/${params.id}`,
    params: { language: "en-US" },
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
        setMovies(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  console.log(movies);

  if (movies) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(0, 0, 0, 0.2)", // Add position relative to the parent box
        }}
      >
        <img
          resizeMode="auto"
          src={`https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces/${movies.backdrop_path}`}
        />

        <Box
          sx={{
            position: "absolute",
            marginLeft: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            // height: "600px",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          ></img>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%", // Add top 50% to vertically center the box
            transform: "translateY(-50%)", // Add transform to adjust the vertical position
            marginLeft: "40%",
            width: "auto",
            height: "",
            color: "white",
          }}
        >
          <Typography variant="h1" gutterBottom>
            {movies.original_name || movies.title}
            <br />
          </Typography>
          <Typography variant="h5" gutterBottom>
            {movies.genres.map((item) => (
              <li>{item.name}</li>
            ))}
          </Typography>
          <br />
          <br />
          <Typography variant="h5" gutterBottom>
            Overview :
            <br />
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {movies.overview}
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default DetailPage;
