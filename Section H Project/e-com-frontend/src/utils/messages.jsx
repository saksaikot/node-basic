const ShowErrorMessage = ({ error, message }) =>
  error ? <div className={`alert alert-danger`}>{message}</div> : null;
const Loading = ({ loading }) =>
  loading ? <div className="alert alert-info">Loading...</div> : null;
export { ShowErrorMessage, Loading };
