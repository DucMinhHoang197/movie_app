import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
// import MainFooter from "./MainFooter";
import Header from "../layouts/Header";
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
