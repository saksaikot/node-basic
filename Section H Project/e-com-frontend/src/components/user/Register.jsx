import { useState } from "react";
import Layout from "../Layout";
import { register } from "../api/auth";
import { Link } from "react-router-dom";
import { ShowErrorMessage } from "../../utils/messages";
const initState = {
  name: "",
  email: "",
  password: "",
  error: false,
  loading: false,
  success: false,
};
const Register = () => {
  const [values, setValues] = useState({ ...initState });

  const { name, email, password, success, error, loading } = values;
  const SuccessMessage = () =>
    success ? (
      <div className="alert alert-primary">
        New Account Created. Please <Link to="/login">Login</Link>
      </div>
    ) : null;
  const handleOnChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    const registerData = { name, email, password };
    setValues({ ...values, loading: true });
    register(registerData)
      .then((response) => {
        setValues({ ...initState, success: true, loading: false });
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
        <label className="text-muted">Name:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          required
        />
      </div>
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
        Create Account
      </button>
    </form>
  );

  return (
    <Layout title="Register" className="container col-md-8 offset-md-2">
      <h3>Register Here,</h3>
      <hr />
      {signUpForm()}
      <hr />
    </Layout>
  );
};

export default Register;
