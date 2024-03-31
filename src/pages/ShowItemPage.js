import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import "./ShowItemPage.css";
function ShowItemPage() {
  const params = useParams();
  const [movies, setMovies] = useState([]);
  console.log(params, "params");
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
  }, []);
  console.log(movies, "222222222222222222");
  return (
    <>
      {movies.map((movie) => (
        <div className="showitempic">
          <img
            style={{ width: "20%" }}
            className="poster"
            key={movie.id}
            src={`https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces${movie.backdrop_path}`}
            alt={movie.title || "movie image"}
          />
          <p>{movie?.name?.length > 0 ? movie.name : movie.title}</p>
        </div>
      ))}
    </>
  );
}

export default ShowItemPage;
