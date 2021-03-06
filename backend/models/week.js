'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class week extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  week.init({
    number: DataTypes.INTEGER,
    inventory: DataTypes.INTEGER,
    backlog: DataTypes.INTEGER,
    demand: DataTypes.INTEGER,
    incomingShipment: DataTypes.INTEGER,
    outgoingShipment: DataTypes.INTEGER,
    orderPlaced: DataTypes.INTEGER,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'week',
  });

  week.associate = models => {
    week.belongsToMany(models.role, { through: "roleWeeks"});
  };
  return week;
};