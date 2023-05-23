const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TypePoints extends Model {}

  TypePoints.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo nombre no puede estar vacio",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo descripcion no puede estar vacio",
          },
        },
      },
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
    }
  );

  return TypePoints;
};
