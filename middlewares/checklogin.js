const jwt = require("jsonwebtoken");

const checklogin = (err, req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, userId } = decoded;
    req.email = email;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error)
    next("Authentication failure!");
  }
};

module.exports = checklogin;
