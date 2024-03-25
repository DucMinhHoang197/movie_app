import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
// import MainFooter from "./MainFooter";
import Header from "../layouts/Header";
function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Outlet />
    </Stack>
  );
}

export default MainLayout;
