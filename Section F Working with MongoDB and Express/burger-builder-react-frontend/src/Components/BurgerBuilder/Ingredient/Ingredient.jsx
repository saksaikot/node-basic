import React from 'react'
import Bottom from "../../../assets/images/bottom.png";
import Cheese from "../../../assets/images/cheese.png";
import Meat from "../../../assets/images/meat.png";
import Salad from "../../../assets/images/salad.png";
import Top from "../../../assets/images/top.png";


export default function Ingredient({ingredientName}) {
  const ingredientType={
    Bottom,Cheese,Meat,Salad,Top
  }
  return (
    <div>
      {
      ingredientType[ingredientName] && 
      <div className="ingredient">
          <img className="ingredient__img" src={ingredientType[ingredientName]} alt={`Burger ${ingredientType[ingredientName]}`} />
      </div>
      }
    </div>
  )
}
