module.exports = (err, req, res) => {
  return res.status(500).send("Im broke and here is the error " + err.message);
};
