import React from "react";

const CartItem = ({}) => {
  return (
    <tr>
      <th scope="row"></th>
      <th></th>
      <td></td>
      <td>
        <button className="btn btn-outline-primary btn-sm">-</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-outline-primary btn-sm">+</button>
      </td>
      <td align="right">৳ </td>
      <td>
        <button className="btn btn-danger btn-sm">Remove From Cart</button>
      </td>
    </tr>
  );
};

export default CartItem;
