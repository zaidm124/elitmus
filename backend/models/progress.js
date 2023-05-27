'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Progress.init({
    r1s: DataTypes.STRING,
    r1e: DataTypes.STRING,
    r2s: DataTypes.STRING,
    r2e: DataTypes.STRING,
    r3s: DataTypes.STRING,
    r3e: DataTypes.STRING,
    r4s: DataTypes.STRING,
    r4e: DataTypes.STRING,
    r5s: DataTypes.STRING,
    r5e: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Progress',
  });
  return Progress;
};