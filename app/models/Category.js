const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo categoria no puede estar vacio",
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
      amount_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reference_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: "categoria",
      foreignKey: "categoryId",
    });
  };

  return Category;
};
