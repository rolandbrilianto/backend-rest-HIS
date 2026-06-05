const validateUpdateProfile = (body) => {
  const { first_name, last_name } = body;

  if (!first_name || !last_name) {
    throw {
      status: 102,
      message: "First name dan last name tidak boleh kosong",
    };
  }
};

module.exports = { validateUpdateProfile };
