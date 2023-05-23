//const sequelize = require('sequelize');
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {}

  Service.init(
    {
      confirmation_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      request_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      confirmation_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      total_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
    }
  );

  Service.associate = (models) => {
    Service.belongsToMany(models.Product, { through: models.ServiceProducts });
    Service.belongsTo(models.User, { as: "origin", foreignKey: "origin_code" });
  };

  return Service;
};
