const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Origin extends Model { }

  Origin.init({
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  })

  Origin.associate = (models) => {
    Origin.belongsTo(models.User, { as: 'user' });
    Origin.hasMany(models.Service, {as: 'servicios', foreignKey: 'origin_id'})
    Origin.hasOne(models.Address, {as: 'domicilio', foreignKey: 'origin_id'})
  }

  return Origin;
}