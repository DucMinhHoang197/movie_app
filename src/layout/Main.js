import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

function Main() {
  const API_KEY = "4079dea8c60daa01c357d2bdebd8dd6f";
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/day",
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDc5ZGVhOGM2MGRhYTAxYzM1N2QyYmRlYmQ4ZGQ2ZiIsInN1YiI6IjY1ZjUwZDk2YTRhZjhmMDE2NDAyMGFkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9r0WNC0irGgNPRW_QgG46ke0wBDaLGYeXjFnLX6OunA",
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
  }, []);

  const [movies, setMovies] = useState([]);

  return (
    <div>
      <h1>Trending Movies</h1>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide>
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || "movie image"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Main;
