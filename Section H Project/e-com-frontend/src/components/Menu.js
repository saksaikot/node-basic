import CustomLink from "./CustomLink";

const Menu = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <CustomLink className="nav-link" to="/">
            Home
          </CustomLink>
        </li>
        <li className="nav-item">
          <CustomLink className="nav-link" to="/login">
            Login
          </CustomLink>
        </li>
        <li className="nav-item">
          <CustomLink className="nav-link" to="/register">
            Register
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
