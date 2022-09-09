const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });

  if (!user) {
    throw RequestError(401, "Not authorized");
  }

  res.json({ email: user.email, subscription: user.subscription });
};

module.exports = logout;
