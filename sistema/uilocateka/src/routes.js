import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import MovieListPage from "./pages/MovieListPage";
import UserCreateUpdatePage from "./pages/UserCreateUpdatePage";
import MovieCreateUpdatePage from "./pages/MovieCreateUpdatePage";
import MovieRentalListPage from "./pages/MovieRentalListPage";


const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users-create" element={<UserCreateUpdatePage />} />
          <Route
            path="/users-update/:idUser"
            element={<UserCreateUpdatePage />}
          />
          <Route path="/movie" element={<MovieListPage />} />
          <Route path="/movie-create" element={<MovieCreateUpdatePage />} />
          <Route
            path="/movie-update/:idMovie"
            element={<MovieCreateUpdatePage />}
          />
          <Route path="/movie-rental/" element={<MovieRentalListPage />} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
