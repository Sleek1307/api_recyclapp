const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RewardImage extends Model {}

  RewardImage.init(
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
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El campo url no puede estar vacio",
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

  RewardImage.associate = (models) => {
    RewardImage.belongsTo(models.Reward, {
      as: "image",
      foreignKey: "reward_id",
    });
  };

  return RewardImage;
};
