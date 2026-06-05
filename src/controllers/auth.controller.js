const { register, login } = require("../services/auth.service");
const { validateRegister, validateLogin } = require("../schemas/auth.schema");
const { sendResponse } = require("../utils/response");
const registerController = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    validateRegister(req.body);
    await register(email, first_name, last_name, password);
    return sendResponse(res, 200, 0, "Registrasi berhasil silakan login");
  } catch (error) {
    return sendResponse(
      res,
      400,
      error.status || 102,
      error.message || "Terjadi kesalahan",
    );
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    validateLogin(req.body);

    const data = await login(email, password);

    return sendResponse(res, 200, 0, "Login Sukses", data);
  } catch (error) {
    const httpStatus = error.status === 103 ? 401 : 400;
    return sendResponse(
      res,
      httpStatus,
      error.status || 102,
      error.message || "Terjadi kesalahan",
    );
  }
};
module.exports = { registerController, loginController };
