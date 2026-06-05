const validateAmount = (body) => {
  const { top_up_amount } = body;
  if (!Number.isFinite(top_up_amount) || top_up_amount <= 0) {
    throw {
      status: 102,
      message:
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
    };
  }
};

module.exports = { validateAmount };
