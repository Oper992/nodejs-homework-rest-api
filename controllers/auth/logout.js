const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });

  if (!user) {
    throw RequestError(401, "Not authorized");
  }

  await User.findOneAndUpdate(_id, { token: "" });
  res.status(204);
};

module.exports = logout;
