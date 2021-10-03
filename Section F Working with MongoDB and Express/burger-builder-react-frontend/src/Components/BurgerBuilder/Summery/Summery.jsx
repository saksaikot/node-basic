import React from "react";

export default function Summery({ ingredients }) {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.name}>
          <span>{ingredient.name}</span> : {ingredient.amount}
        </li>
      ))}
    </ul>
  );
}
