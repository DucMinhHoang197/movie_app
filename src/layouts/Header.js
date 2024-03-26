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
  const handleClickAdd = () => {};
  
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
        <button className="transparent-button" onClick={handleClickAdd}>
          FAVORITE
        </button>
      </div>
      <div className="searchbt">
        {/* <div> */}
        <SearchIcon onClick={()=>{handleSearch(searchText)}} />

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
