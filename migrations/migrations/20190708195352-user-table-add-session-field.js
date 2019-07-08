'use strict';
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'session_key', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: moment().unix()
    }),
  /* eslint-disable no-unused-vars */
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('users', 'session_key')
};
