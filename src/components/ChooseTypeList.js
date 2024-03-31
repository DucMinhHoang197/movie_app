import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function ChooseTypeList() {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  let navigate = useNavigate();
  ///////////xu ly choose type list
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
  ///////////////////
  const [state, setState] = React.useState({
    // top: false,
    left: false,
    // bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    const handleListItemClick = (name) => {
      navigate(`/showitem/${name}`);
      console.log(name, "clickkkkkkkkkkkkkkk");
    };
    if (anchor === "MvList") {
      return (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {movieList.map((movie) => (
              <ListItem key={movie.id} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={movie.name}
                    onClick={() => handleListItemClick(movie.name)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    }

    // Nội dung cho các vị trí khác
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {tvList.map((tvShow) => (
            <ListItem key={tvShow.id} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={tvShow.name}
                  onClick={() => handleListItemClick(tvShow.name)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <div style={{ display: "flex", marginLeft: "10px" }}>
      {["TvList", "MvList"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{ color: "white", marginRight: "40px" }}
          >
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
