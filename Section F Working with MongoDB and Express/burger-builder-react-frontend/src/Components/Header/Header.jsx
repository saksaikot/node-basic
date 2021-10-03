import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import Logo from "../../assets/images/logo.png";

const mapStateToProps = (state) => ({
  token: state.token,
});

function Header(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const navLinks = props.token ? (
    <>
      <NavItem>
        <NavLink exact to="/" className="navbar__nav-link">
          Burger Builder
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink exact to="/order" className="navbar__nav-link">
          Order
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink exact to="/logout" className="navbar__nav-link">
          Logout
        </NavLink>
      </NavItem>
    </>
  ) : (
    <NavItem>
      <NavLink exact to="/register" className="navbar__nav-link">
        Register
      </NavLink>
      <NavLink exact to="/login" className="navbar__nav-link">
        Login
      </NavLink>
    </NavItem>
  );

  const nav = (
    <Nav className="mr-md-5 primary-accent" navbar onClick={toggleNavbar}>
      {navLinks}
    </Nav>
  );
  const navByDisplay =
    width <= 768 ? (
      <>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          {nav}
        </Collapse>
      </>
    ) : (
      nav
    );

  return (
    <Navbar className="primary-accent" color="faded">
      <div className="container">
        <NavbarBrand className="mr-auto ml-md-5 navbar__brand">
          <NavLink to="/" className="navbar__nav-link">
            <img
              src={Logo}
              className="navbar__logo"
              alt="burger builder logo"
            />
          </NavLink>
        </NavbarBrand>
        {navByDisplay}
      </div>
    </Navbar>
  );
}

export default connect(mapStateToProps)(Header);
