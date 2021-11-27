import React, { useState } from "react";

export default function HomeCategories({ categories }) {
  const [selected, setSelected] = useState({});

  const handleClickCheckBox = (id) => {
    setSelected({ ...selected, [id]: !selected[id] });
  };
  const selectedCategoryArray = () => {
    const arr = [];
    for (let key in selected) if (selected[key]) arr.push(key);
    return arr;
  };
  return (
    <div className="row">
      <div className="col-sm-3">
        <h5>Filter By Categories</h5>
        {JSON.stringify(selectedCategoryArray())}
        <ul>
          {categories.map((category) => (
            <li className="list-unstyled">
              <input
                type="checkbox"
                className="form-check-input"
                id={category._id}
                value={selected[category._id] ? true : false}
                onChange={() => handleClickCheckBox(category._id)}
              />
              <label htmlFor={category._id} className="form-check-label">
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
