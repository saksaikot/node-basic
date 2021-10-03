import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { localAuthCheck } from "../redux/authActionCreators";
import Auth from "./Auth/Auth";
import LogOut from "./Auth/LogOut";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./BurgerBuilder/Order/Checkout";
import Orders from "./BurgerBuilder/Order/Orders";
import Header from "./Header/Header";

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  localAuthCheck: () => dispatch(localAuthCheck()),
});

function Main({ token, localAuthCheck }) {
  // console.log(props);
  useEffect(() => {
    localAuthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loggedIn = token ? (
    <Switch>
      <Route path="/order" component={Orders} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/logout" component={LogOut} />

      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/register" component={Auth} />
      <Route exact path="/login" component={Auth} />
      <Redirect to="/login" />
    </Switch>
  );
  return (
    <div>
      <Header />

      <div className="container">{loggedIn}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
