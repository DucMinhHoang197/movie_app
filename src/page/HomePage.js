import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Header } from "../layout";

import "./HomePage.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

function HomePage() {
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
        {movies.map((movie) => (
          <SwiperSlide>
            <img
              className="poster"
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title || "movie image"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomePage;
