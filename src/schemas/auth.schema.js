const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (body) => {
  const { email, first_name, last_name, password } = body;

  if (!email || !emailRegex.test(email)) {
    throw { status: 102, message: "Paramter email tidak sesuai format" };
  }

  if (!first_name || !last_name) {
    throw {
      status: 102,
      message: "First name dan last name tidak boleh kosong",
    };
  }

  if (!password || password.length < 8) {
    throw {
      status: 102,
      message: "Password harus memiliki minimal 8 karakter",
    };
  }
};

const validateLogin = (body) => {
  const { email, password } = body;

  if (!email || !emailRegex.test(email)) {
    throw { status: 102, message: "Paramter email tidak sesuai format" };
  }

  if (!password || password.length < 8) {
    throw {
      status: 102,
      message: "Password harus memiliki minimal 8 karakter",
    };
  }
};

module.exports = { validateRegister, validateLogin };
