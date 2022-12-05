//const sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model { };

  Service.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo total no puede ser nulo",
        },
      }
    },
    costo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo total no puede ser nulo",
        },
      },
      defaultValue: 0
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: true
  })

  Service.associate = (models) => {
    Service.belongsToMany(models.Product, { through: 'service_product' });
    Service.belongsTo(models.Service, { as: 'origin' });
    Service.belongsTo(models.Service, { as: 'recolector' });
    Service.belongsTo(models.TypeService, { as: 'typeServices' })
  }

  return Service;
};