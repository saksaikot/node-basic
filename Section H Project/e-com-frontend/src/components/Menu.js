import CustomLink from "./CustomLink";
import { useNavigate } from "react-router-dom";
import { isAuthenticate, signout } from "../utils/auth";

const Menu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signout(() => {
      navigate("/login");
    });
  };
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <CustomLink className="nav-link" to="/">
            Home
          </CustomLink>
        </li>
        {!isAuthenticate() && (
          <>
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
          </>
        )}
        {isAuthenticate() && (
          <>
            <li className="nav-item">
              <CustomLink className="nav-link" to="/dashboard">
                Dashboard
              </CustomLink>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
