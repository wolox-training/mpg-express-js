module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define(
    'album',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      }
    },
    {
      timestamps: true,
      tableName: 'albums',
      underscored: true
    }
  );
  return album;
};
