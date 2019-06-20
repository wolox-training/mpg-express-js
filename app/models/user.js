module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Is not a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return user;
};
