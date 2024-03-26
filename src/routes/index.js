import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import MoviePage from "../pages/MoviePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AuthRequire from "./AuthRequire";
import TvPage from "../pages/TvPage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";
function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Route>

      <Route path="/" element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
