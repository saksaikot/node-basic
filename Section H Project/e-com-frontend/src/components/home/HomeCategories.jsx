import React, { useEffect, useState } from "react";

export default function HomeCategories({ categories, handleCategorySelect }) {
  const [selected, setSelected] = useState({});
  useEffect(() => {
    const arr = [];
    for (let key in selected) if (selected[key]) arr.push(key);
    handleCategorySelect(arr);
  }, [selected]);

  const handleClickCheckBox = (id) => {
    setSelected({ ...selected, [id]: !selected[id] });
  };
  // const selectedCategoryArray = () => {
  //   const arr = [];
  //   for (let key in selected) if (selected[key]) arr.push(key);
  //   return arr;
  // };
  return (
    <>
      <h5>Filter By Categories</h5>
      {console.log(categories, typeof categories, "categories")}
      <ul>
        {categories.length > 0 &&
          categories.map((category) => (
            <li className="list-unstyled" key={category._id}>
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
    </>
  );
}
