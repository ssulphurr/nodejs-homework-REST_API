const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);

  res.json({ email: newUser.email });
};

module.exports = {
  register: ctrlWrapper(register),
};
