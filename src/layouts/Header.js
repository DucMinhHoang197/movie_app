import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ChooseTypeList from "../components/ChooseTypeList";
function Header() {
  const auth = useAuth();
  let navigate = useNavigate();
  // const urlMovie = useStore((state) => state.urlMovie);
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");

  //xu ly type
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  console.log(movieList, setMovieList);
  console.log(tvList, setTvList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optionTVList = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/tv/list",
    params: { language: "en" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
    },
  };
  useEffect(() => {
    axios
      .request(optionTVList)
      .then(function (response) {
        setTvList(response.data.genres);
        console.log(response.data, "tvlist");
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optionMovieList = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list",
    params: { language: "en" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkzZmE0MGI1NmZhYTY4MDc2NTQ5NGQwNWUyODEzOSIsInN1YiI6IjY1ZjkxNjI4Nzk4Yzk0MDE0NzE0ZmU5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjW4_CP4pfISPXSZFGRtOgTpgeAwrqe7Dh6HcGof2WQ",
    },
  };
  useEffect(() => {
    axios
      .request(optionMovieList)
      .then(function (response) {
        setMovieList(response.data.genres);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //////////////////////////
  const handleSearch = () => {
    navigate(`/search/${searchText}`);
  };
  const handleClickMovie = () => {
    navigate("/movie");
  };
  const handleClickTv = () => {
    navigate("/tv");
  };
  const handleClickAll = () => {
    navigate("/");
  };
  const handleClickFavorite = () => {
    navigate("/favorite");
  };

  return (
    <div className="header">
      <div className="nav">
        <Typography
          variant="h2"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={handleClickAll}
        >
          MTV
        </Typography>

        <Button
          onClick={handleClickMovie}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          MOVIE
        </Button>
        <Button
          className="transparent-button"
          onClick={handleClickTv}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          TV SHOW
        </Button>
        <Button
          className="transparent-button"
          onClick={handleClickFavorite}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          FAVORITE
        </Button>
      </div>
      <ChooseTypeList />
      <div className="searchbt">
        {/* <div> */}
        <SearchIcon
          onClick={() => {
            handleSearch(searchText);
          }}
        />

        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* <h3 className="login-text">Login</h3> */}
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Welcome {user?.username}!
        </Typography>
        <button
          className="logout-button"
          onClick={() => {
            auth.logout(() => navigate("/"));
          }}
        >
          <LogoutIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

export default Header;
