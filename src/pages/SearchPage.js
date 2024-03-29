import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import useFavorite from "../hooks/useFavorite";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./SearchPage.css";

function SearchPage() {
  const param = useParams();
  console.log(param);
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();
  const { toggleFavorite, isMovieFavorite } = useFavorite();
  const handleClickButton = (type, id) => {
    navigate(`/detail/${type}/${id}`);
  };

  const optionsearch = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/multi?query=${param.query}&include_adult=false&language=en-US&page=1`,
    // params: {
    //   language: "en-US",
    //   page: "1",
    // },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
    },
  };

  useEffect(() => {
    axios
      .request(optionsearch)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Swiper className="mySwiper">
        {movies.map((movie) => {
          return (
            <SwiperSlide>
              <img
                className="poster"
                key={movie.id}
                src={`https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces${movie.backdrop_path}`}
                alt={movie.title || "movie image"}
              />
              <div className="infor">
                <div className="title">
                  <Typography variant="h5">
                    {movie?.name?.length > 0 ? movie.name : movie.title}
                  </Typography>
                  <br />
                </div>

                <div className="text-icon">
                  <TheatersIcon />
                  <Typography variant="h7"> {movie.release_date}</Typography>
                  <InsertChartIcon />
                  <Typography variant="h7"> {movie.vote_average}</Typography>
                </div>

                <div className="overview">
                  <br />
                  <Typography variant="h10"> {movie.overview}</Typography>
                </div>
                <div className="buttonLearnmore">
                  <div className="button">
                    <Button
                      variant="outlined"
                      sx={{ color: "white", border: "1px solid white" }}
                      onClick={() =>
                        handleClickButton(movie.media_type, movie.id)
                      }
                    >
                      LEARN MORE
                    </Button>
                  </div>
                  <button
                    className="bticon"
                    onClick={() => toggleFavorite(movie.id)}
                  >
                    {isMovieFavorite(movie.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SearchPage;
