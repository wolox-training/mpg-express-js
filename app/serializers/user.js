exports.userSerializer = user => ({
  name: user.name,
  lastname: user.lastname,
  email: user.email,
  is_admin: user.isAdmin
});

exports.listUsersSerializer = users => users.map(exports.userSerializer);
