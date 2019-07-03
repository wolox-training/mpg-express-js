'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'is_admin', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }),
  /* eslint-disable no-unused-vars */
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('users', 'is_admin')
};
