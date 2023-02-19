var jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userId;
        next();
      } else {
        res.send({ msg: "Login First" });
      }
    });
  } else {
    res.send({ msg: "Login First" });
  }
};

module.exports = { authentication };
