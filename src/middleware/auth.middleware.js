const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header["authorization"] || req.header["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return sendResponse(res, 401, 108, "Token tidak valid atau kadaluwarsa");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, 108, "Token tidak valid atau kadaluwarsa");
  }
};

module.exports = { authMiddleware };
