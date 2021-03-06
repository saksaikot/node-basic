import React from "react";
import { API_BASE } from "../../utils/config";

const CartItem = ({
  cartItem,
  index,
  handleIncreaseDecrease,
  handleDeleteCart,
}) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <th>
        <img
          src={`${API_BASE}product/photo/${cartItem.product._id}`}
          alt={cartItem.product.name}
          width="40px"
        />
      </th>
      <td>{cartItem.product.name}</td>
      <td>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            handleIncreaseDecrease(cartItem._id, cartItem.count - 1)
          }
        >
          -
        </button>
        &nbsp;&nbsp;
        {cartItem.count}&nbsp;&nbsp;
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            handleIncreaseDecrease(cartItem._id, cartItem.count + 1)
          }
        >
          +
        </button>
      </td>
      <td align="right">৳ {cartItem.count * cartItem.price}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteCart(cartItem._id)}
        >
          Remove From Cart
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
// {
//   "_id": "61a358067d63f326a0f0fb0a",
//   "product": {
//       "_id": "61958e8b2402077e31146967",
//       "name": "5 seconds rule 6"
//   },
//   "price": 123,
//   "count": 1,
//   "user": {
//       "_id": "6193ef296190db65744d89e1",
//       "name": "sultan"
//   },
//   "purchased": false,
//   "deleted": false,
//   "createdAt": "2021-11-28T10:20:54.587Z",
//   "updatedAt": "2021-11-28T10:20:54.587Z",
//   "__v": 0
// }
