import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";

export default function Control({
  handleMoreLessIngredient,
  totalPrice,
  handelToggleModel,
  purchasable,
}) {
  const controls = ["Cheese", "Meat", "Salad"];
  return (
    <div>
      <Card>
        <CardHeader className="add-ingredient-header">
          Add ingredients
        </CardHeader>

        <CardBody>
          {controls.map((control) => (
            <div className="d-flex" key={control}>
              <div className="me-5 ms-auto flex-fill align-items-center">
                {control}
              </div>
              <Button
                className="btn btn-danger btn-sm m-1"
                onClick={() =>
                  handleMoreLessIngredient({ name: control, amount: -1 })
                }
              >
                less
              </Button>
              <Button
                className="btn btn-success btn-sm m-1"
                onClick={() =>
                  handleMoreLessIngredient({ name: control, amount: 1 })
                }
              >
                More
              </Button>
            </div>
          ))}
        </CardBody>

        <CardFooter className="text-center">Price:{totalPrice} BDT</CardFooter>
        <Button
          className="primary-accent"
          onClick={() => handelToggleModel()}
          disabled={!purchasable}
        >
          Order
        </Button>
      </Card>
    </div>
  );
}
