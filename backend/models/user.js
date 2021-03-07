'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isInstructor: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });

  user.associate = models => {
    user.belongsToMany(models.role, { through: "roleUsers"});
  };

  return user;
};