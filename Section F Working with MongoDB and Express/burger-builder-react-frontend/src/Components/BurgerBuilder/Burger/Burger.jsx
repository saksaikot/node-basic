import React from "react";
import Ingredient from "../Ingredient/Ingredient";

export default function Burger({ ingredients }) {
  let ingredientElement = [];

  ingredients.map((ingredient) =>
    [...Array(ingredient.amount).keys()].map((_) =>
      ingredientElement.push(
        <Ingredient key={Math.random()} ingredientName={ingredient.name} />
      )
    )
  );

  if (ingredientElement.length === 0)
    ingredientElement = <p>Please add some ingredients</p>;

  return (
    <>
      <div className="burger">
        <Ingredient ingredientName="Top" />
        {ingredientElement}
        <Ingredient ingredientName="Bottom" />
      </div>
    </>
  );
}
