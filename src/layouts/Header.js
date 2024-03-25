import React from "react";
import useStore from "../store";

import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const auth = useAuth();
  let navigate = useNavigate();
  const urlMovie = useStore((state) => state.urlMovie);
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };
  const handleClickMovie = () => {
    urlMovie("https://api.themoviedb.org/3/trending/movie/day");
  };
  return (
    <div className="header">
      <div className="nav">
        <h1>MTV </h1>
        <h4>All</h4>
        <button onClick={handleClickMovie}>MOVIE</button>
        <h4>PEOPEL</h4>
        <h4>TV SHOW</h4>
      </div>
      <div className="searchbt">
        {/* <div> */}
        <SearchIcon />

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
