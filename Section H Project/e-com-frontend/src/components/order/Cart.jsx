import Layout from "../Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../api/admin";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  useEffect(() => {
    getCart()
      .then((response) => setCartItems(response.data.data))
      .catch((er) => console.log(er));
  }, []);

  return (
    <Layout
      title="Your Cart"
      description="Hurry up! Place your order!"
      className="container"
    >
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Order</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>
      <div className="container my-5">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" width="15%">
                #
              </th>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col" align="right">
                Price
              </th>
              <th scop="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem, index) => (
              <CartItem key={index} {...{ cartItem, index }} />
            ))}
            <tr>
              <th scope="row" />
              <td colSpan={2}>Total</td>
              <td align="right">৳ </td>
              <td />
            </tr>
            <tr>
              <th scope="row" />
              <td colSpan={4} className="text-right">
                <Link to="/">
                  <button className="btn btn-warning mr-4">
                    Continue Shoping
                  </button>
                </Link>
                <Link to="/checkout" className="btn btn-success mr-4">
                  Proceed To Checkout
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Cart;
