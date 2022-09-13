const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model { };

    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo categoria no puede ser nulo"
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo descripcion no puede ser nulo"
                }
            }
        }
    },
        {
            sequelize,
            timestamps: false,
            underscored: true
        })

    Category.associate = (models) => {
        Category.hasMany(models.Item, {as: 'categoria', foreignKey: 'category_id'})
    }

    return Category
}