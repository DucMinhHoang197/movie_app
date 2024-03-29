import React from "react";
import axios from "axios";

import useAuth from "../hooks/useAuth";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";

import "./Favorite.css";
function FavoritePage() {
  const data = localStorage.getItem("favorites");
  const dataArray = JSON.parse(data);
  console.log(dataArray, "data");

  return (
    <div>
      {dataArray ? (
        <Swiper
          slidesPerView={3}
          grid={{
            rows: 2,
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className="mySwiper"
        >
          {dataArray.map((movie) => (
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
      ) : (
        <p>No favorite movie</p>
      )}
    </div>
  );
}

export default FavoritePage;
