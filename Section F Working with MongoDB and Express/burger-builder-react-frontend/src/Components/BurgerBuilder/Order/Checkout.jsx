import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import {
  updateCheckoutForm,
  resetBurgerState,
  saveOrder,
  fetchOrders,
} from "../../../redux/actionCreators";
import { PAYMENT_OPTION } from "../../../redux/constants";
import Input from "../../Input/Input";
import Loader from "../../Loader/Loader";

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  totalPrice: state.totalPrice,
  ingredients: state.ingredients,
  purchasable: state.purchasable,
  orders: state.orders,
  userId: state.userId,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  updateCheckoutForm: (checkout) => dispatch(updateCheckoutForm(checkout)),
  resetBurgerState: () => dispatch(resetBurgerState()),
  saveOrder: (order) => dispatch(saveOrder(order)),
  fetchOrders: () => dispatch(fetchOrders()),
});

class Checkout extends Component {
  state = {
    submitting: false,
    submitMessage: "",
    modalIsOpen: false,
  };

  // componentDidMount() {
  //   if (this.props.orders === null) this.props.loadOrders();
  // }
  handleOnChange = (event) => {
    const checkout = { ...this.props.checkout };
    checkout[event.target.name] = event.target.value;
    this.props.updateCheckoutForm(checkout);
  };

  handleGoBack(e) {
    e.preventDefault();
    this.props.history.goBack("/");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { checkout, ingredients, totalPrice, token } = this.props;

    const order = {
      customer: checkout,
      ingredients,
      price: totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    };
    console.log(order, "checkout order");

    this.setState({ submitting: true });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const API_BASE_URI = process.env.REACT_APP_API_ENDPOINT_BASE;

    const orderEnd = API_BASE_URI + "orders";

    axios
      .post(orderEnd, order)
      .then((response) => {
        if (response.status === 200) {
          order.id = response.data.name;
          // order.uid = this.props.userId;
          // console.log(order, this.props.orders);
          this.setState({
            submitMessage: "Order placed successfully",
            submitting: false,
            modalIsOpen: true,
            // orders: { ...this.props.orders, order },
          });
          this.props.saveOrder({ order });
          this.props.resetBurgerState();
        } else {
          this.setState({
            submitMessage: "Can not place your order, try again",
            submitting: false,
            modalIsOpen: true,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          submitMessage:
            "Can not place your order, please check your internet and try again",
          submitting: false,
          modalIsOpen: true,
        });
      });
  };

  handleModal = () => {
    this.setState({
      modalIsOpen: false,
    });
    this.props.history.goBack("/");
  };
  render() {
    const { name, address, phone, payment } = this.props.checkout;
    const { totalPrice, purchasable } = this.props;
    const loading = <Loader />;
    const form = (
      <>
        <h4 className="add-border">Payment : {totalPrice} BDT</h4>
        <div className="add-border">
          <form onChange={this.handleOnChange}>
            <Input name="name" value={name} />
            <Input name="address" type="textarea" value={address} />
            <Input name="phone" value={phone} />
            <Input name="payment" options={PAYMENT_OPTION} value={payment} />

            <button
              className=" my-2 btn btn-primary primary-accent"
              onClick={this.handleSubmit.bind(this)}
              disabled={!purchasable}
            >
              Place Order
            </button>
            <button
              className=" my-2 mx-2 btn btn-secondary"
              onClick={this.handleGoBack.bind(this)}
            >
              Cancel
            </button>
          </form>
        </div>
      </>
    );

    return (
      <>
        {this.state.submitting ? loading : form}

        <Modal
          isOpen={this.state.modalIsOpen}
          onClick={this.handleModal.bind(this)}
        >
          <ModalBody>{this.state.submitMessage}</ModalBody>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
