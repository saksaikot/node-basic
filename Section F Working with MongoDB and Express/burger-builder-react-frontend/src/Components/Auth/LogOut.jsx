import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../redux/authActionCreators";

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

function LogOut({ logout }) {
  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Redirect to="/" />;
}
export default connect(null, mapDispatchToProps)(LogOut);
