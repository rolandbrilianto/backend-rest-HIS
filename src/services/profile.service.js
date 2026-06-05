const {
  findUserByEmail,
  updateProfileImage,
  updateProfile,
} = require("../models/user.model");

const getProfile = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw { status: 108, message: "Token tidak tidak valid atau kadaluwarsa" };
  }

  return user;
};

const editProfile = async (email, firstName, lastName) => {
  const user = await updateProfile(email, firstName, lastName);
  return user;
};

const editProfileImage = async (email, profileImage) => {
  const user = await updateProfileImage(email, profileImage);
  return user;
};

module.exports = { getProfile, editProfile, editProfileImage };
