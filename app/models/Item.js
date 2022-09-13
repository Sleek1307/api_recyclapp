const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Item extends Model { };

    Item.init({
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: "El campo descripcion no puede ser nulo",
            }
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: "EL campo cantidad no puede ser nulo"
            }
        }
    }, {
        sequelize,
        timestamps: false,
        underscored: true
    })

    Item.associate = (models) => {
        Item.belongsTo(models.Service, { as: 'item' })
        Item.belongsTo(models.Category, {as:'category'})
    }

    return Item;
}