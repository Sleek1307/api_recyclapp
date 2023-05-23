const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TypeService extends Model {}

  TypeService.init(
    {
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo tipo no puede estar vacio",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "TypeService",
      underscored: true,
    }
  );

  TypeService.associate = (models) => {
  };

  return TypeService;
};
