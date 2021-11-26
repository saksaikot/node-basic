import React from "react";
import { Redirect, Routes, Route } from "react-router-dom";
import Dashboard from "./user/Dashboard";
import Home from "./home/Home";
import RequireAuth from "./RequireAuth";
import Login from "./user/Login";
import Register from "./user/Register";

export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
