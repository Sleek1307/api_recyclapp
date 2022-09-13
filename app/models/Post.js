const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model { }

  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El campo unicamente puede ser de tipo texto"
        },
        notNull: {
          msg: "El campo titulo no puede ser nulo"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo contenido contenido no puede ser nulo"
        }
      }
    },
    typePost: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo tipo no puede ser nulo"
        }
      }
    }
  }, {
    sequelize,
    timestamps: true,
    underscored: true
  })

  Post.associate = (models) => {
    Post.hasMany(models.Step, { as: 'post_anexo', foreignKey: 'post_id' })
    Post.belongsTo(models.User, { as: 'autor' })
    Post.belongsToMany(models.User, { through: 'image_post', timestamps: false })
    Post.belongsToMany(models.Tag, {through: 'tag_post', timestamps: false})
  }

  return Post;
}