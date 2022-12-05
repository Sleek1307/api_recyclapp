const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model { };

  User.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    //Primer nombre del usuario
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo nombre no puede ser nulo"
        }
      }
    },
    //Segundo nombre del usuario
    secondaryName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    //Primer apellido del usuario
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo apellido no puede ser nulo"
        }
      }
    },
    //Segundo apellido del usuario
    secondaryLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El apellido del usuario no puede ser nulo"
        }
      }
    },
    //Email del usuario
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El correo no puede estar vacio"
        }
      }
    },
    //Contraseña de usuario
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La contraseña no puede estar vacia"
        }
      }
    },
    //Numero de celular
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    //Puntaje promedio
    averageScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: "El puntaje del usuario no puede ser nulo"
        },
        isNumeric: "El puntaje del usuario solo puede ser de tipo numerico"
      }
    },
    //Estado del usuario(Elimminado o vigente)
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {
          msg: "El estado del usuario no puede ser nulo"
        }
      }
    },
    //token de restauracion de contraseña
    restoreToken: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  })

  User.associate = (models) => {
    User.hasOne(models.Address, { as: 'address', foreignKey: 'userId' })
    User.hasMany(models.Post, { as: 'publicaciones', foreignKey: 'autorId' })
    User.belongsTo(models.Role, { as: 'rol', foreignKey: 'roleId' })
    User.hasMany(models.Service, { as: 'origin', foreignKey: 'originId', keyType: DataTypes.STRING });
    User.hasMany(models.Service, { as: 'recolector', foreignKey: 'recolectorId', keyType: DataTypes.STRING })
  }

  return User;
}