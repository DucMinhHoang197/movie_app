import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


import { Swiper, SwiperSlide } from "swiper/react";
import { Header } from "../layouts";

import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import Button from "@mui/material/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomePage.css";

import { Pagination, Navigation } from "swiper/modules";

function HomePage() {
  const auth = useAuth();
  let navigate = useNavigate();
  // const urlMovie = useStore((state) => state.url);
  const optionAll = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/all/day",
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
    },
  };
  console.log(optionAll);
  useEffect(() => {
    axios
      .request(optionAll)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const [movies, setMovies] = useState([]);
  console.log(movies,"1111111111111111");
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }
  const handleClickButton=(id)=>{
    navigate(`/detail/${id}`)
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
                  onClick={()=>handleClickButton(movie.id)}
                >
                  LEARN MORE
                </Button>
                </div>
                <button className="bticon">
                <FavoriteIcon/>
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
