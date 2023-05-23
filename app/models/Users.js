const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      type_document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El tipo de documento no puede estar vacio",
          },
        },
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El numero de documento no puede estar vacio",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      social_reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "El correo no puede estar vacio",
          },
        },
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            msg: "El estado del usuario no puede ser nulo",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "La contraseña no puede estar vacia",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      scorage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      contractNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      restoreToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Address, { as: "address", foreignKey: "address_id" });
    User.belongsToMany(models.Reward, {through: models.RewardUser, as:"rewarded"})
    User.hasMany(models.Service, {
      as: "origin",
      foreignKey: "origin_code",
      keyType: DataTypes.STRING,
    });
    User.hasOne(models.Agreement, {as: "user"})
    User.belongsTo(models.Role, {as: "rol"})
  };

  return User;
};
