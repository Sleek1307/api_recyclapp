const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model { }

    Image.init({
        title: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: 'El campo titulo solo soporta letras y numeros'
            }
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true
    })

    Image.associate = (models) => {
        Image.belongsToMany(models.Post, {through: 'image_post'})
        Image.belongsToMany(models.Step, {through: 'image_step'})
    }

    return Image;
}