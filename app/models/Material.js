const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {}

  Category.init({
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
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo stock no puede estar vacio",
        },
      },
    },
  });
};
