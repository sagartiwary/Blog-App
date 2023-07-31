import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { CreatePage } from "../Pages/CreatePage";
import { PrivateRoute } from "./PrivateRoute";
import { SingleBlog } from "../Pages/SingleBlog";
import { EditPage } from "../Pages/EditPage";
export const Mainroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePage />
          </PrivateRoute>
        }
      />
      <Route path="/create/:id" element={<SingleBlog />} />
      <Route
        path="/update/:postID"
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};
