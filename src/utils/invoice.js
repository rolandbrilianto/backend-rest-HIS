const generateInvoice = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const randomNum = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${dateStr}-${randomNum}`;
};

module.exports = { generateInvoice };
