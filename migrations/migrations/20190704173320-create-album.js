'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('albums', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_at: Sequelize.DATE,
      created_at: Sequelize.DATE
    }),
  /* eslint-disable no-unused-vars */
  down: (queryInterface, Sequelize) => queryInterface.dropTable('albums')
  /* eslint-enable no-unused-vars */
};
