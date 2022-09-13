const sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Address extends Model { };

    Address.init({
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo calle no puede estar nulo"
                }
            },
            defaultValue: ""
        },
        streetNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo numero de carrera no puede estar nulo"
                }
            },
            defaultValue: ""
        },
        houseNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: "El campo cas no puede estar vacio"
            },
            defaultValue: ""
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo anotacion no puede ser nulo"
                }
            }
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true
    })

    Address.associate = (models) => {
        Address.belongsTo(models.Origin, { as: 'domicilio' })
    }

    return Address;
}