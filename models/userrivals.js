'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRivals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userRivals.init({
    userId: DataTypes.INTEGER,
    rivalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userRivals',
  });
  return userRivals;
};