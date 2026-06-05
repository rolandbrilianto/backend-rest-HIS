const {
  getProfile,
  editProfile,
  editProfileImage,
} = require("../services/profile.service");
const { validateUpdateProfile } = require("../schemas/profile.schema");
const { sendResponse } = require("../utils/response");

const getProfileController = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await getProfile(email);
    return sendResponse(res, 200, 0, "Sukses", user);
  } catch (error) {
    return sendResponse(
      res,
      401,
      error.status || 108,
      error.message || "Terjadi kesalahan",
    );
  }
};

const updateProfileController = async (req, res) => {
  try {
    const email = req.user.email;
    const { first_name, last_name } = req.body;
    validateUpdateProfile(req.body);
    const user = await editProfile(email, first_name, last_name);
    return sendResponse(res, 200, 0, "Update Profil Berhasil", user);
  } catch (error) {
    return sendResponse(
      res,
      400,
      error.status || 102,
      error.message || "Terjadi kesalahan",
    );
  }
};

const updateProfileImageController = async (req, res) => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, 102, "Format Image tidak sesuai");
    }
    const profileImage = req.file.path; // Cloudinary return URL di req.file.path
    const user = await editProfileImage(req.user.email, profileImage);
    return sendResponse(res, 200, 0, "Update Profile Image berhasil", user);
  } catch (error) {
    return sendResponse(
      res,
      400,
      error.status || 102,
      error.message || "Terjadi kesalahan",
    );
  }
};

module.exports = {
  getProfileController,
  updateProfileController,
  updateProfileImageController,
};
