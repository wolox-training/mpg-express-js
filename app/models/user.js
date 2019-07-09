const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
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
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_admin'
      },
      sessionKey: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: moment().unix(),
        field: 'session_key'
      }
    },
    {
      timestamps: true,
      tableName: 'users',
      underscored: true
    }
  );
  return user;
};
