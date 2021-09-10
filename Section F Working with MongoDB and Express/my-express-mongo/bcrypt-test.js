const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(password, salt);
  return await bcrypt.hash(password, salt);
};
hashPassword("saikot").then((pass) => console.log(pass));
