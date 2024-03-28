import React from "react";
import axios from "axios";

import useAuth from "../hooks/useAuth";

function FavoritePage() {
  const data = localStorage.getItem("favorites");
  const dataArray = JSON.parse(data);
  console.log(dataArray, "data");
  return <div>FavoritePage</div>;
}

export default FavoritePage;
