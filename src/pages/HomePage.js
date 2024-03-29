import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFavorite from "../hooks/useFavorite";

import { Swiper, SwiperSlide } from "swiper/react";
import { Header } from "../layouts";
import { MOVIE_DB } from "../constants/movieDB";
import { generateRequestAction } from "../helpers/movieDB";

import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomePage.css";

import { Pagination, Navigation } from "swiper/modules";

function HomePage() {
  const { toggleFavorite, isMovieFavorite } = useFavorite();
  const auth = useAuth();
  let navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const handleClickAdd = (id) => {
    toggleFavorite(id);
  };
  // console.log(toggleFavorite, "111111111111");
  const handleClickButton = (type, id) => {
    navigate(`/detail/${type}/${id}`);
  };
  const requestOptions = generateRequestAction("GET", MOVIE_DB.GET_ALL);
  console.log(isMovieFavorite, "11111111");
  useEffect(() => {
    axios
      .request(requestOptions)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="SwiperSlide">
      <Header />
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide>
              <img
                className="poster"
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
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
                <br />

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

export default HomePage;
