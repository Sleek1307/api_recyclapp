const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {}

  Reward.init(
    {
      necesary_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo de puntuacion necesaria no puede estar vacio",
          },
        },
      },
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
      timestamps: true, 
      underscored: true
    }
  );

  Reward.associate = (models) => {
    Reward.hasMany(models.RewardImage, {
      as: "image",
      foreignKey: "reward_id",
    });
    Reward.belongsTo(models.TypePoint, {as: 'type_point'})
    Reward.belongsToMany(models.User, {through: models.RewardUser, as:'rewards'})
  };

  return Reward;
};
