import React from "react";
import axios from "axios";

import useAuth from "../hooks/useAuth";
import { Header } from "../layouts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./Favorite.css";
function FavoritePage() {
  const data = localStorage.getItem("favorites");
  const dataArray = JSON.parse(data);
  console.log(dataArray, "data");

  return (
    <div className="container">
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {dataArray ? (
          dataArray.map((movie) => (
            <ImageListItem>
              <img
                className="poster"
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title || "movie image"}
              />
            </ImageListItem>
          ))
        ) : (
          <p>No favorite movie</p>
        )}
      </ImageList>
    </div>
  );
}

export default FavoritePage;
