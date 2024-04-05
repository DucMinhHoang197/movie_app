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
  const handleClickButton = (type, id) => {
    navigate(`/detail/${type}/${id}`);
  };
  const requestOptions = generateRequestAction("GET", MOVIE_DB.GET_ALL);

  console.log(movies, "11111111");
  useEffect(() => {
    axios
      .request(requestOptions)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  !auth.user && <p>You are not logged in.</p>;

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
          const {
            name = "",
            title,
            release_date,
            vote_average,
            overview,
            media_type,
            id,
            backdrop_path,
          } = movie;
          return (
            <SwiperSlide>
              <img
                className="poster"
                key={id}
                src={`https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces${backdrop_path}`}
                alt={title || "movie image"}
              />
              <div className="infor">
                <div className="title">
                  <Typography variant="h5">
                    {name.length > 0 ? name : title}
                  </Typography>
                  <br />
                </div>

                <div className="text-icon">
                  <TheatersIcon />
                  <Typography variant="h7"> {release_date}</Typography>
                  <InsertChartIcon />
                  <Typography variant="h7"> {vote_average}</Typography>
                </div>

                <div className="overview">
                  <br />
                  <Typography variant="h10"> {overview}</Typography>
                </div>
                <br />

                <div className="buttonLearnmore">
                  <div className="button">
                    <Button
                      variant="outlined"
                      sx={{ color: "white", border: "1px solid white" }}
                      onClick={() => handleClickButton(media_type, id)}
                    >
                      LEARN MORE
                    </Button>
                  </div>
                  <button
                    className="bticon"
                    onClick={() =>
                      toggleFavorite({
                        id: movie.id,
                        name: movie.name,
                        title: movie.title,
                        backdrop_path: movie.backdrop_path,
                        media_type: movie.media_type,
                      })
                    }
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
