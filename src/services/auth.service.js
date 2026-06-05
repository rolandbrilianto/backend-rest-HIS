const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/user.model");

const register = async (email, first_name, last_name, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw { status: 102, message: "Email sudah terdaftar" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(email, first_name, last_name, hashedPassword);
  return user;
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw { status: 103, message: "Username atau password salah" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 103, message: "Username atau password salah" };
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  return { token };
};

module.exports = { register, login };
