import React from "react";
import { Redirect, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Register from "./user/Register";

export default function Main() {
  return (
    <div>
      Main
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
