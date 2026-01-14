const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ name, email, password });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

module.exports = { register, login };
