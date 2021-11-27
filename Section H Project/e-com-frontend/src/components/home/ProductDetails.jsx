import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import {
  ShowErrorMessage,
  ShowSuccessMessage,
  Loading,
} from "../../utils/messages";
import { getProduct } from "../api/admin";
import { API_BASE as API } from "../../utils/config";
import { useParams } from "react-router-dom";
export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = useParams().id;
  useEffect(() => {
    setLoading(true);

    getProduct(id)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data
          : "Something went wrong, error was: " + error.message;
        setError(errorMessage);
        setLoading(false);
        setSuccess(false);
      });
  }, []);
  return (
    <Layout title="Product Page">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <a href="#">Product</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {product.category ? product.category.name : ""}
          </li>
        </ol>
      </nav>
      <div>
        <ShowErrorMessage error={error} message={error} />
        <ShowSuccessMessage success={success} message="Item Added to Cart!" />
        <Loading loading={loading} />
      </div>
      <div className="row container">
        <div className="col-6">
          <img
            src={`${API}product/photo/${product._id}`}
            alt={product.name}
            width="100%"
          />
        </div>
        <div className="col-6">
          <h3>{product.name}</h3>
          <span style={{ fontSize: 20 }}>&#2547;</span>
          {product.price}
          <p>
            {product.quantity ? (
              <span class="badge badge-pill badge-primary">In Stock</span>
            ) : (
              <span class="badge badge-pill badge-danger">Out of Stock</span>
            )}
          </p>
          <p>{product.description}</p>
          {product.quantity ? (
            <>
              &nbsp;
              <button className="btn btn-outline-primary btn-md">
                Add to Cart
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
}
