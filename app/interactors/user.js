const { createUser, findUserByEmail, updateUser } = require('../servicesDatabase/user'),
  { encryptPassword, comparePassword } = require('../utils/userValidations'),
  errors = require('../errors'),
  logger = require('../logger'),
  { generateToken } = require('../utils/token');

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
    const userFound = await findUserByEmail(user.email);
    if (userFound) {
      if (userFound.isAdmin) {
        logger.error(`The email ${userFound.email} already exist as admin`);
        throw errors.userSignupError('The email already exist as admin');
      }
      const userToupdate = { ...userFound.dataValues };
      userToupdate.isAdmin = true;

      const UpdatedUser = await updateUser(userToupdate);
      return [UpdatedUser[0].dataValues, false];
    }
    const isAdmin = true;
    const createdUser = await exports.createNewUser(user, isAdmin);
    return [createdUser, true];
  } catch (e) {
    throw e;
  }
};
