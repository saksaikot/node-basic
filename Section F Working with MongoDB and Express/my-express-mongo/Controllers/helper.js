const errorBadRequest = (res, error) => {
  const { errors } = error;
  if (!errors) return res.status(400).send(error.message);
  const message = [];
  for (const errorKey in errors) {
    message.push(errors[errorKey].message);
  }
  return res.status(400).send(message);
};
const errorNotFound = (res) => {
  return res.status(404).send("Resource not found!");
};

module.exports = {
  errorBadRequest,
  errorNotFound,
};
