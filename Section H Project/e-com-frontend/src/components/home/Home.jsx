import React, { useEffect, useState } from "react";
import {
  Loading,
  ShowErrorMessage,
  ShowSuccessMessage,
} from "../../utils/messages";
import { getProducts, getCategories } from "../api/admin";
import Layout from "../Layout";
import Card from "./Card";
import HomeCategories from "./HomeCategories";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [limit, setLimit] = useState(10);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts({ sortBy, order, limit })
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError("Product loading failed");
      });
    getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => setError("Categories loading failed"));
  }, [sortBy, order, limit]);

  return (
    <Layout title="Home Page" className="container-fluid">
      <div className="w-100">
        <ShowErrorMessage error={error} message={error} />
        <ShowSuccessMessage
          success={success}
          message="Added to cart successfully!"
        />
        {console.log(loading)}
        <Loading loading={loading} />
        <HomeCategories categories={categories} />
      </div>
      <div className="row">
        {products &&
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
      </div>
    </Layout>
  );
}
