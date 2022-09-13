const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recolector extends Model { }

  Recolector.init({
    qr: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: true
  })

  Recolector.associate = (models) => {
    Recolector.belongsTo(models.User, { as: 'recolector' })
    Recolector.hasMany(models.Service, {as: 'serviccios', foreignKey: 'recolector_id'})
  }

  return Recolector;
}