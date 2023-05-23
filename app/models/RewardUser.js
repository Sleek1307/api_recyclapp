const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RewardUser extends Model {}

  RewardUser.init(
    {
      current_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo de puntuacion actual no pued estar vacio",
          },
        },
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            msg: "El campo state no puede estar vacio",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true, 
      underscored: true
    }
  );

  return RewardUser
};
