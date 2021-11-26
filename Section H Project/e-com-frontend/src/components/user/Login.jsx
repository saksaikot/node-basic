import { useState } from "react";
import Layout from "../Layout";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import { ShowErrorMessage } from "../../utils/messages";
import { Navigate } from "react-router-dom";
import { authenticate } from "../../utils/auth";

const initState = {
  name: "",
  email: "",
  password: "",
  error: false,
  loading: false,
  success: false,
};
const Login = () => {
  const [values, setValues] = useState({ ...initState });

  const { email, password, success, error, loading } = values;
  const SuccessMessage = () => (success ? <Navigate to="/" /> : null);
  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    const registerData = { email, password };
    setValues({ ...values, loading: true });
    login(registerData)
      .then((response) => {
        if (response.data.token) {
          authenticate(response.data.token, () => {
            setValues({ ...initState, success: true, loading: false });
          });
        }
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data
          : "Something went wrong, error was: " + error.message;
        setValues({ ...values, error: true });

        setValues({ ...values, error: errorMessage, loading: false });
        console.log(values, errorMessage);
      });
    //   .finally(() => setValues({ ...values, loading: false }));
  };

  const signUpForm = () => (
    <form onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <ShowErrorMessage error={error} message={error} />
      <SuccessMessage />
      <div className="form-group">
        <label className="text-muted">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={email}
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={password}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Login
      </button>
    </form>
  );

  return (
    <Layout title="Register" className="container col-md-8 offset-md-2">
      <h3>Login Here,</h3>
      <hr />
      {signUpForm()}
      <hr />
    </Layout>
  );
};

export default Login;
