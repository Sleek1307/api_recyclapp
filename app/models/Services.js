const sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model { };

  Service.init({
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "EL campo total no puede ser nulo"
        }
      }
    },
    typeService: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "EL campo tipo no puede ser nulo"
        }
      }
    }
  }, {
    sequelize,
    underscored: true,
    timestamps: true
  })

  Service.associate = (models) => {
    Service.belongsTo(models.Origin, { as: 'origin' })
    Service.belongsTo(models.Recolector, { as: 'recolector' })
    Service.hasMany(models.Item, {as: 'items', foreignKey: 'item_id'})
  }

  return Service;
};