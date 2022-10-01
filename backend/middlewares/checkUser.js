const jwt = require("jsonwebtoken");
const Address = require("../modals/address");
const checkUser = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log(token)

        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        next();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Not authorized, token failed" });
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = checkUser;
