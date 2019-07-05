const { encryptPassword } = require('../utils/userValidations');

exports.loginAdminUserMapper = async (user, encrypPass = false) => {
  if (encrypPass) {
    const encryptedPassword = await encryptPassword(user.password);
    user.password = encryptedPassword;
  }
  return {
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    isAdmin: true
  };
};
