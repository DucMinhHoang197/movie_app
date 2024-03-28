import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

// import TheatersIcon from "@mui/icons-material/Theaters";
// import Typography from "@mui/material/Typography";
// import InsertChartIcon from "@mui/icons-material/InsertChart";

// import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./DetailPage.css";

function DetailPage() {
  const auth = useAuth();
  const [movies, setMovies] = useState();
  const params = useParams();

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/${params.id}`,
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
  }, [params]);

  console.log(movies);

  if (movies) {
    return (
      <div className="details-container">
        <div className="details-container-background">
          <img
            resizeMode="auto"
            src={`https://image.tmdb.org/t/p/w500${movies.backdrop_path}`}
          ></img>
        </div>
        <div className="image-inner">
          <div className="box-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
            ></img>
          </div>
          <div className="box-details">
            <div className="original-title-details">
              {movies.original_name}{" "}
              <span className="release-date">
                ({movies.first_air_date.substring(0, 4)})
              </span>
            </div>
            <div className="genres-details">
              {movies.genres.map((item) => (
                <li>{item.name}</li>
              ))}
            </div>
            <div className="overview-details">
              <p>Overview</p>
              {movies.overview}
            </div>
            <div className="created-by-details">
              {movies.created_by.map((item) => (
                <li>{item.name}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailPage;
