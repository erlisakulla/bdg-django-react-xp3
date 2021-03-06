'use strict';

const user = require("./user");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  game.init({
    sessionLength: DataTypes.INTEGER,
    distributorPresent: DataTypes.BOOLEAN,
    wholesalerPresent: DataTypes.BOOLEAN,
    holdingCost: DataTypes.INTEGER,
    backlogCost: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    infoSharing: DataTypes.BOOLEAN,
    infoDelay: DataTypes.INTEGER,
    roundsCompleted: DataTypes.INTEGER,
    isDefaultGame: DataTypes.BOOLEAN,
    startingInventory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game',
  });

  game.associate = models => {
    game.belongsTo(models.user);
    game.belongsToMany(models.role, { through: "roleGames"});
  };

  return game;
};