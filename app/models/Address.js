const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {}

  Address.init(
    {
      road: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo calle no puede estar nulo",
          },
        },
        defaultValue: "",
      },
      streetNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo numero de carrera no puede estar nulo",
          },
        },
        defaultValue: "",
      },
      houseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "El campo numero de casa no puede estar vacio",
        },
        defaultValue: "",
      },
      coordinates: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo anotacion no puede ser nulo",
          },
        },
        defaultValue: "",
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Address.associate = (models) => {
    Address.hasOne(models.User, { as: "address", foreignKey: "address_id" });
  };

  return Address;
};
