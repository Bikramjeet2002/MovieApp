import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import MainLayout from "../pages/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Movies from "../pages/movies/Movies";
import PrivateRoute from "./PrivateRoute";
import PublicaRoute from "./PublicaRoute";
// import Profile from "../pages/Home/Profile";

const RouteManger = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicaRoute/>}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="movies" element={<Movies />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteManger;
