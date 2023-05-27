'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Progresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      r1s: {
        type: Sequelize.STRING
      },
      r1e: {
        type: Sequelize.STRING
      },
      r2s: {
        type: Sequelize.STRING
      },
      r2e: {
        type: Sequelize.STRING
      },
      r3s: {
        type: Sequelize.STRING
      },
      r3e: {
        type: Sequelize.STRING
      },
      r4s: {
        type: Sequelize.STRING
      },
      r4e: {
        type: Sequelize.STRING
      },
      r5s: {
        type: Sequelize.STRING
      },
      r5e: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Progresses');
  }
};