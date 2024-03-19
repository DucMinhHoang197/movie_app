import React from "react";
import Logo from "../components/Logo";

import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";

function Header() {
  return (
    <div className="header">
      <h2>MTV </h2>
      <h2>Home</h2>
      <h2>Trending</h2>
      <h2>TV show</h2>
      <SearchIcon />
    </div>
  );
}

export default Header;
