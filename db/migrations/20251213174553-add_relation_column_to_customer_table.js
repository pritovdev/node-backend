'use strict';

const { CUSTOMER_TABLE, customer_schema } = require('../Models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', customer_schema.userId);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
