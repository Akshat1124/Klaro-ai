const authService = require("../services/authService");
const { successResponse } = require("../utils/apiResponse");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    successResponse(res, 201, "User registered successfully", user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    successResponse(res, 200, "Login successful", user);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
