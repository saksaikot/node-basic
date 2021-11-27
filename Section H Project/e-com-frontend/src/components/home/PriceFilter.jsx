import React from "react";
import { prices } from "../../utils/prices";

export default function PriceFilter({ handlePriceSelect }) {
  // const handleClick = (range) => {
  //   console.log(range);
  // };
  return (
    <>
      <h5>Filter by price:</h5>
      <div className="row">
        {prices.map((price) => (
          <div className="col-6" key={`price${price.id}`}>
            <input
              type="radio"
              className="mr-2"
              name="price_filter"
              onClick={() => handlePriceSelect(price.arr)}
              id={`price${price.id}`}
            />
            <label
              htmlFor={`price${price.id}`}
              className="form-check-label mr-4"
            >
              {price.name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
