import Layout from "../Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCart, getCart, updateCart } from "../api/admin";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const loadCartItems = () => {
    getCart()
      .then((response) => setCartItems(response.data.data))
      .catch((er) => console.log(er));
  };
  useEffect(() => {
    loadCartItems();
  }, []);
  const totalPrice = () => {
    if (cartItems.length < 1) {
      return 0;
    } else {
      return cartItems.reduce((pre, cur) => cur.count * cur.price + pre, 0);
    }
  };
  const handleIncreaseDecrease = (_id, count) => {
    if (count > 0 && count < 6)
      updateCart({ _id, count })
        .then((response) => loadCartItems())
        .catch((err) => console.log(err));
  };
  const handleDeleteCart = (id) => {
    deleteCart(id)
      .then((response) => loadCartItems())
      .catch((err) => console.log(err));
  };
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
              <CartItem
                key={index}
                {...{
                  cartItem,
                  index,
                  handleIncreaseDecrease,
                  handleDeleteCart,
                }}
              />
            ))}
            <tr>
              <th scope="row" />
              <td colSpan={3}>Total</td>
              <td align="right">৳{totalPrice()} </td>
              <td />
            </tr>
            <tr>
              <th scope="row" />
              <td colSpan={5} className="text-right">
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
