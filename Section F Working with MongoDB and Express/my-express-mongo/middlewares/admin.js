module.exports = function (req, res, next) {
  console.log(req.user);
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  next();
};

// user t1@t.com eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkYTJhY2U4MjI4MDM1N2U5NDE0ZTMiLCJlbWFpbCI6InQxQHQuY29tIiwiaWF0IjoxNjMyNDc3ODY4fQ.ssilTlH4WkS7rT15gXXCYM3sh_0hHuFnElV6P0GGn_Y

//admin t2@t.com eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkYTJkMjdhMTZlNmIwNDMyMDNjMTgiLCJlbWFpbCI6InQyQHQuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjMyNDc4MjcwfQ.Ta7cnaFmlNGs4MoGkbLIBb4UNbix2LQZHn5fotm-JbM
