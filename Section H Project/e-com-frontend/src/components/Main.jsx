import React from "react";
import { Redirect, Routes, Route } from "react-router-dom";
import Home from "./home/Home";

export default function Main() {
  return (
    <div>
      Main
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
