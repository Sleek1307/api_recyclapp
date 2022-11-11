const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model { };

  User.init({
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
      defaultValue:'',
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
      defaultValue: true,
      validate: {
        notNull: {
          msg: "El estado del usuario no puede ser nulo"
        }
      }
    },
    //Verificacion de cuenta
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull:{
          msg: "La verificacion de cuenta no puede estar nula"
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