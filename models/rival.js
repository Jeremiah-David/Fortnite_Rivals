'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rival extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.rival.belongsToMany(models.user, {through: "userrivals"})
      models.rival.hasMany(models.comment)
    }
  };
  rival.init({
    epicUsername: DataTypes.STRING,
    epicId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rival',
  });
  return rival;
};