const bcrypt = require("bcryptjs");

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
}

module.exports = comparePassword;