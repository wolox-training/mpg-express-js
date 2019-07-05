const { createUser, findUserByEmail, updateUser } = require('../servicesDatabase/user'),
  { encryptPassword, comparePassword } = require('../utils/userValidations'),
  errors = require('../errors'),
  logger = require('../logger'),
  { generateToken } = require('../utils/token'),
  { loginAdminUserMapper } = require('../mappers/user');

exports.createNewUser = (user, isAdmin = false) =>
  encryptPassword(user.password).then(hash => {
    if (isAdmin) {
      user.isAdmin = true;
    }
    user.password = hash;
    return createUser(user);
  });

exports.loginUser = (email, password) =>
  findUserByEmail(email)
    .then(user => {
      if (!user) {
        logger.error('Invalid email');
        throw errors.userSigninError('Email or password invalid');
      }
      return comparePassword(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) {
        logger.error('Invalid password');
        throw errors.userSigninError('Email or password invalid');
      }
      return generateToken({ user: email });
    });

exports.loginAdmin = async user => {
  try {
    let userToCreateOrUpdate = {};
    const userFound = await findUserByEmail(user.email);
    if (userFound) {
      if (userFound.isAdmin) {
        logger.error(`The email ${userFound.email} already exist as admin`);
        throw errors.userSignupError('The email already exist as admin');
      }
      userToCreateOrUpdate = await loginAdminUserMapper(userFound);
      console.log(userToCreateOrUpdate);
    } else {
      const encryptPass = true;
      userToCreateOrUpdate = await loginAdminUserMapper(user, encryptPass);
      console.log(userToCreateOrUpdate);
    }
    const updatedOrCreatedUser = await updateUser(userToCreateOrUpdate);
    return [updatedOrCreatedUser[0].dataValues, updatedOrCreatedUser[1]];
  } catch (e) {
    throw e;
  }
};
