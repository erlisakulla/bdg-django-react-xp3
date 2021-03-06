'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role.init({
    roleName: DataTypes.STRING,
    downstreamPlayer: DataTypes.INTEGER,
    upstreamPlayer: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role',
  });

  role.associate = models => {
    role.belongsToMany(models.game, { through: "roleGames"});
    role.belongsToMany(models.week, { through: "roleWeeks"});
  };

  return role;
};