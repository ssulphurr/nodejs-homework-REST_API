const bcrypt = require("bcrypt");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashRassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashRassword });

  res.json({ email: newUser.email });
};

module.exports = {
  register: ctrlWrapper(register),
};
