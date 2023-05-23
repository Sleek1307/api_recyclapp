'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Installment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Installment.init({
    installment_id: DataTypes.STRING,
    amount_payment: DataTypes.DECIMAL,
    dept_remaining: DataTypes.DECIMAL,
    date_payment: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Installment',
  });
  return Installment;
};