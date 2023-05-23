const { models } = require("mongoose");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo rol no puede estar vacio",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      underscored: true,
    }
  );

  Role.associate = () => {
    Role.hasMany(models.User, { as: "user" });
  };
  return Role;
};
