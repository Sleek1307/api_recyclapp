const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ServiceProducts extends Model{};

    ServiceProducts.init({
        amount:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        point: {
            type: DataTypes.STRING,
            allowNull: true
        },
        volumen: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        sequelize, 
        underscored: true,
        timestamps: false
    })

    return ServiceProducts;
}