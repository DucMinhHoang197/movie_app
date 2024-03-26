import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

import "./Favorite.css";

function FavoritePage() {
  const auth = useAuth();
  const optionAll = {
    method: "POST",
    url: "https://api.themoviedb.org/3/account/21117136/favorite",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
    },
    data: { media_type: "movie", media_id: 550, favorite: true },
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
  return <div>Favorite</div>;
}

export default FavoritePage;
