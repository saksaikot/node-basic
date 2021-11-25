const ShowMessage = ({ error, message }) => {
  let errorClass = error ? "danger" : "success";
  return <div className={`alert alert-${errorClass}`}>{message}</div>;
};

const Loading = ({ loading }) =>
  loading ? <div className="alert alert-info">Loading...</div> : null;
export { ShowMessage, Loading };
