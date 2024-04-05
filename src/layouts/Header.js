import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import ChooseTypeList from "../components/ChooseTypeList";
import Box from "@mui/material/Box";

// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';

// import Toolbar from '@mui/material/Toolbar';
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const auth = useAuth();
  let navigate = useNavigate();

  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");

  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pages = ["Products", "Pricing", "Blog"];

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
  /////////////////mobie
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center" onClick={handleClickAll}>
              MTV
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center" onClick={handleClickMovie}>
              MOVIE
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center" onClick={handleClickTv}>
              TV SHOW
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Typography textAlign="center" onClick={handleClickFavorite}>
              FAVORITE
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
      <div className="nav">
        <Typography
          variant="h2"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={handleClickAll}
        >
          MTV
        </Typography>

        <Typography
          onClick={handleClickMovie}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          MOVIE
        </Typography>
        <Typography
          className="transparent-button"
          onClick={handleClickTv}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          TV SHOW
        </Typography>
        <Typography
          className="transparent-button"
          onClick={handleClickFavorite}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          FAVORITE
        </Typography>
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
