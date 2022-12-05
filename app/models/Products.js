const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model { };

    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre del producto no puede ser nulo'
                },
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El producto debe llevar una descripcion",
                }
            },
            defaultValue: ''
        },
    }, {
        sequelize,
        underscored: true,
        timestamps: true,
    })

    Product.associate = (models) => {
        Product.belongsToMany(models.Service, {through: 'service_product'})
        Product.belongsTo(models.Category, {as: 'categoria', foreignKey: 'categoryId'})
    }

    return Product;
}