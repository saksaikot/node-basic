import React, { useEffect, useState } from "react";
import {
  Loading,
  ShowErrorMessage,
  ShowSuccessMessage,
} from "../../utils/messages";
import { getProducts, getCategories, getFilteredProducts } from "../api/admin";
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
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   getProducts({ sortBy, order, limit })
  //     .then((response) => {
  //       setLoading(false);
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       setError("Product loading failed");
  //     });
  //   getCategories()
  //     .then((response) => setCategories(response.data))
  //     .catch((error) => setError("Categories loading failed"));
  // }, [sortBy, order, limit]);

  useEffect(() => {
    const filterData = { sortBy, order, limit, skip, filter };
    // console.log(filterData);
    getFilteredProducts(filterData)
      .then((response) => setProducts(response.data))
      .catch((error) => setError("Failed to load products"));

    getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => setError("Categories loading failed"));
  }, [sortBy, order, limit, skip, filter]);

  const handleCategorySelect = (selectedCategory) => {
    if (selectedCategory.length > 0)
      setFilter({ ...filter, in: { category: selectedCategory } });
  };

  return (
    <Layout title="Home Page" className="container-fluid">
      <div className="w-100">
        <ShowErrorMessage error={error} message={error} />
        <ShowSuccessMessage
          success={success}
          message="Added to cart successfully!"
        />
        <Loading loading={loading} />
        <HomeCategories
          categories={categories}
          handleCategorySelect={handleCategorySelect}
        />
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
