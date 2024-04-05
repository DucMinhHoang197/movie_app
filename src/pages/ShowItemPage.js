import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import BoxShowItem from "../components/form/BoxShowItem";

import "./ShowItemPage.css";
import { Stack } from "@mui/material";
function ShowItemPage() {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  console.log(params, "params");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/collection?query=${params.name}&include_adult=false&language=en-US&page=1`,

    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  console.log(movies, "dataaaaaaaaaaaaaaa");
  return (
    <Stack mt="90px">
      {movies.map((movie) => {
        return <BoxShowItem movie={movie} />;
      })}
    </Stack>
  );
}

export default ShowItemPage;
