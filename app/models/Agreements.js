const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Agreements extends Model {}

  Agreements.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo descripcion no puede estar vacio",
        },
      },
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La fecha de vencimiento no puede estar vacia",
        },
      },
    },
  }, {
    sequelize, 
    underscored: true, 
    timestamps:  true,
  });

  Agreements.associate = (models) => {
    Agreements.belongsTo(models.User, {as: 'user'})
  }

  return Agreements;
};
