'use strict';

const { PRODUCT_TABLE, product_schema } = require('../Models/products.model')
const { CATEGORY_TABLE, category_schema } = require('../Models/category.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, category_schema);
    await queryInterface.createTable(PRODUCT_TABLE, product_schema);
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
