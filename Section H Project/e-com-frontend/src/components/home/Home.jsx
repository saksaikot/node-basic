import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../../utils/auth";
import {
  Loading,
  ShowErrorMessage,
  ShowSuccessMessage,
} from "../../utils/messages";
import {
  getProducts,
  getCategories,
  getFilteredProducts,
  createCart,
} from "../api/admin";
import Layout from "../Layout";
import Card from "./Card";
import HomeCategories from "./HomeCategories";
import PriceFilter from "./PriceFilter";

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
    else {
      const newFilter = { ...filter };

      try {
        delete newFilter.in.category;
        setFilter({ newFilter });
      } catch (er) {}
    }
  };
  const handlePriceSelect = (range) => {
    if (range.length === 2) setFilter({ ...filter, range: { price: range } });
    else {
      const newFilter = { ...filter };
      try {
        delete newFilter.range.price;
        setFilter({ newFilter });
      } catch (er) {}
    }
  };
  const handleCart = (product) => {
    if (!isAuthenticate()) return setError("Please login to add items to cart");
    setError(false);
    setSuccess(false);
    createCart({ product: product._id, price: product.price })
      .then((response) => setSuccess(true))
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data
          : "Something went wrong, error was: " + error.message;
        setError(errorMessage);
      });
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
        <div className="row">
          <div className="col-sm-3">
            <HomeCategories
              categories={categories}
              handleCategorySelect={handleCategorySelect}
            />
          </div>

          <div className="col-sm-5">
            <PriceFilter handlePriceSelect={handlePriceSelect} />
          </div>
        </div>
      </div>
      <div className="row">
        {products &&
          products.map((product) => (
            <Card key={product._id} product={product} handleCart={handleCart} />
          ))}
      </div>
    </Layout>
  );
}
