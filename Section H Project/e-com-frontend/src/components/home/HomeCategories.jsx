import React from "react";

const Category = ({ category }) => (
  <li className="list-unstyled">
    <input type="checkbox" className="form-check-input" id={category._id} />
    <label htmlFor={category._id} className="form-check-label">
      {category.name}
    </label>
  </li>
);
export default function HomeCategories({ categories }) {
  return (
    <div className="row">
      <div className="col-sm-3">
        <h5>Filter By Categories</h5>
        <ul>
          {categories.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </div>
  );
}
