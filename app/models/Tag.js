const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model { };

  Tag.init({
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo etiqueta no puede estar vacio"
        }
      }
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: true
  })

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Post, { through: 'tag_post', timestamps: false })
  }

  return Tag;
}