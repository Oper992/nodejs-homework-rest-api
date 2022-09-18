const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const { RequestError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a href="http://localhost:3000/api/auth/users/verify/${verificationToken}" target="_blank">Натисніть, щоб підтвердити email</a>`,
  };
  await sendEmail(mail);

  res
    .status(201)
    .json({ user: { email: result.email, subscription: result.subscription } });
};

module.exports = register;
