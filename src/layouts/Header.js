import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useAuth from "../hooks/useAuth";

import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
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
  }, []);

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
        <h1 onClick={handleClickAll}>MTV</h1>
        <button className="transparent-button" onClick={handleClickMovie}>
          MOVIE
        </button>

        <button className="transparent-button" onClick={handleClickTv}>
          TV SHOW
        </button>
        <button className="transparent-button" onClick={handleClickFavorite}>
          FAVORITE
        </button>
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
        <Typography variant="h6" color="inherit" component="div">
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default Header;
