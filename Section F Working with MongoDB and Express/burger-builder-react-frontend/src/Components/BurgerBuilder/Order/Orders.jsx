import React, { Component } from "react";
import { connect } from "react-redux";
// import { fetchOrders } from "../../../redux/actionCreators";
import Loader from "../../Loader/Loader";
import Order from "./Order/Order";

// const mapDispatchToProps = (dispatch) => ({
//   fetchOrders: () => dispatch(fetchOrders()),
// });

const mapStateToProps = (state) => ({
  orders: state.orders,
  orderLoading: state.orderLoading,
  orderLoadFailed: state.orderLoadFailed,
});

class Orders extends Component {
  // componentDidMount() {
  //   if (this.props.orders === null) this.props.fetchOrders();
  // }
  render() {
    const { orders, orderLoading, orderLoadFailed } = this.props;

    // console.log(orderLoading, "orderLoading Orders");

    const hasFailedToLoad = <p>Cannot load order from server</p>;
    const hasNoOrder = <p>sorry no order</p>;
    const hasLoadedOrder = orderLoadFailed ? hasFailedToLoad : false;

    const hasOrder =
      orders && orders.length
        ? orders.map((order) => <Order key={order.id} {...order} />)
        : hasNoOrder;

    return (
      <div>
        {orderLoading ? <Loader /> : hasLoadedOrder ? hasLoadedOrder : hasOrder}
      </div>
    );
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Orders);
export default connect(mapStateToProps)(Orders);
