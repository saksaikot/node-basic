const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const tokenHeader = req
    .header("Authorization")
    .trim()
    .match(/bearer ([^\s]+)/);
  if (!tokenHeader[1])
    return res.status(401).send("Access denied! no token provided");
  const token = tokenHeader[1];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) return res.status(400).send("Invalid token");
  req.user = decoded;
  next();
};
