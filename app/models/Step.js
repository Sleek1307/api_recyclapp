const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Step extends Model { }

    Step.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo titulo no puede estar vacio"
                }
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo contenido no puede ser nulo"
                }
            }
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
    })

    Step.associate = (models) => {
        Step.belongsTo(models.Post, { as: 'post' })
        Step.belongsToMany(models.Image, {through:'image_step', timestamps: false})
    }

    return Step;
}
