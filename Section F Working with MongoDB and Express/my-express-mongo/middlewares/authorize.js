const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  const jwtToken = token ? token.split(" ")[1] : null;
  if (!jwtToken) return res.status(401).send("Not Authorized");
  try {
    req.user = jwt.verify(jwtToken, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).send("Bad request");
  }
};
