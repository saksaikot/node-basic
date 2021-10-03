import React, { Component } from "react";
import { connect } from "react-redux";
import { updateIngredientAmount } from "../../redux/actionCreators";
import Burger from "./Burger/Burger";
import Control from "./Control/Control";

import OrderModal from "./Summery/OrderModal";

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  purchasable: state.purchasable,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateIngredientAmount: (ingredientAmount) =>
      dispatch(updateIngredientAmount(ingredientAmount)),
  };
};

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  // handleMoreLessIngredient(name, amount) {
  //   // console.log(this);
  //   const ingredients = [...this.state.ingredients];
  //   const index = ingredients.findIndex((x) => x.name === name);
  //   if (ingredients[index].amount === 0 && amount === -1) return;
  //   const totalPrice = this.state.totalPrice + amount * INGREDIENTS_PRICE[name];
  //   ingredients[index].amount += amount;
  //   let purchasable = true;
  //   if (totalPrice === BASE_PRICE) {
  //     purchasable = false;
  //   }
  //   this.setState({ ingredients, totalPrice, purchasable });
  //   console.log(name, amount);
  // }

  handelToggleModel = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  handleCheckoutButton = () => {
    this.props.history.push("/checkout");
  };
  render() {
    const { state, handelToggleModel, handleCheckoutButton } = this;
    const handleMoreLessIngredient = this.props.updateIngredientAmount;

    const { modalOpen } = state;
    const { ingredients, totalPrice, purchasable } = this.props;
    return (
      <>
        <div className="container d-flex flex-md-row flex-column justify-content-center align-items-center">
          <Burger ingredients={ingredients} />
          <Control
            handleMoreLessIngredient={handleMoreLessIngredient.bind(this)}
            totalPrice={totalPrice}
            handelToggleModel={handelToggleModel}
            purchasable={purchasable}
          />
        </div>
        <OrderModal
          modalOpen={modalOpen}
          ingredients={ingredients}
          handelToggleModel={handelToggleModel}
          totalPrice={totalPrice}
          handleCheckoutButton={handleCheckoutButton}
        ></OrderModal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
