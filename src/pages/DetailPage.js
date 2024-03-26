import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import InsertChartIcon from "@mui/icons-material/InsertChart";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./DetailPage.css"
function DetailPage() {
  const auth = useAuth();
  const [movies, setMovies] = useState();
  const params=useParams()
  console.log(params,"22222222222222")
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${params.id}`,
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ'
    }
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
  
  return (
    <div>DetailPage</div>
  )
}

export default DetailPage