import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./user/Dashboard";
import Home from "./home/Home";
import RequireAuth from "./RequireAuth";
import Login from "./user/Login";
import Register from "./user/Register";
import RequireAdmin from "./RequireAdmin";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import ProductDetails from "./home/ProductDetails";

export default function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/user/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/create/category"
          element={
            <RequireAdmin>
              <CreateCategory />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/create/product"
          element={
            <RequireAdmin>
              <CreateProduct />
            </RequireAdmin>
          }
        />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}
