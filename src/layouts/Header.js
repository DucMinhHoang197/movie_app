import React from "react";
import Logo from "../components/Logo";

import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import useAuth from "../hooks/useAuth";

function Header() {
  const { user } = useAuth();
  return (
    <div className="header">
      <div className="nav">
        <h1>MTV </h1>
        <h4>All</h4>
        <h4>Movie</h4>
        <h4>Peopel</h4>
        <h4>TV show</h4>
      </div>
      <div className="searchbt">
        {/* <div> */}
        <SearchIcon />
        <h3 className="login-text">Login</h3>
        <Typography variant="h6" color="inherit" component="div">
          Welcome {user?.username}!
        </Typography>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Header;
