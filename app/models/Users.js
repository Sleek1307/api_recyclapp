const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model { };

  User.init({
    //Tipo de documento
    typeDoc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "EL campo unicamente puede ser de tipo numerico"
        },
        notNull: {
          msg: "El campo tipo documento no puede ser nulo"
        }
      }
    },
    //Numero del documento
    document: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "EL campo unicamente puede ser de tipo numerico"
        },
        notNull: {
          msg: "El campo document no puede ser nulo"
        }
      }
    },
    //Primer nombre del usuario
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El campo unicamente puede ser de tipo texto"
        },
        notNull: {
          msg: "El campo nombre no puede ser nulo"
        }
      }
    },
    //Segundo nombre del usuario
    secondaryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El campo unicamente puede ser de tipo texto"
        },
        notNull: {
          msg: "El campo nombre no puede ser nulo"
        }
      }
    },
    //Primer apellido del usuario
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El campo apellido unicamente puede ser de tipo texto",
        },
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
        isAlpha: {
          msg: "El campo apellido unicamente puede ser de tipo texto"
        },
        notNull: {
          msg: "El campo apellido no puede ser nulo"
        }
      }
    },
    //Email del usuario
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El campo debe ser un correo valido"
        },
        notNull: {
          msg: "El correo no puede ser nulo"
        }
      }
    },
    //Contraseña de usuario
    pasword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo"
        }
      }
    },
    //Numero de celular
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo"
        },
        isNumeric: {
          msg: "El campo unicamente puede ser de tipo numerico"
        }
      }
    },
    //Puntaje promedio
    averageScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  })

  User.associate = (models) => {
    User.hasMany(models.Post, { as: 'publicaciones', foreignKey: 'autor_id' })
    User.hasOne(models.Origin, { as: 'origin', foreignKey: 'user_id' });
    User.hasOne(models.Recolector, { as: 'recoleccion', foreignKey: 'recolector_id' })
  }

  return User;
}