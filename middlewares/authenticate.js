const { User } = require("../models/user");

const { RequestError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }
  try {
    const user = await User.findOne({ token });
    if (!user) {
      next(RequestError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authenticate;
