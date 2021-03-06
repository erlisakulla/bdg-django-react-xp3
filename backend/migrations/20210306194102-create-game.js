'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionLength: {
        type: Sequelize.INTEGER
      },
      distributorPresent: {
        type: Sequelize.BOOLEAN
      },
      wholesalerPresent: {
        type: Sequelize.BOOLEAN
      },
      holdingCost: {
        type: Sequelize.INTEGER
      },
      backlogCost: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      infoSharing: {
        type: Sequelize.BOOLEAN
      },
      infoDelay: {
        type: Sequelize.INTEGER
      },
      roundsCompleted: {
        type: Sequelize.INTEGER
      },
      isDefaultGame: {
        type: Sequelize.BOOLEAN
      },
      startingInventory: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('games');
  }
};