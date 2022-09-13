const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config.js');

const User = require('../models/Users.js');
const Post = require('../models/Post.js');
const Step = require('../models/Step.js');
const Image = require('../models/Image.js');
const Origin = require('../models/Origin.js');
const Recolector = require('../models/Recolector.js');
const Tag = require('../models/Tag.js');
const Services = require('../models/Services.js');
const Items = require('../models/Item.js');
const Category = require('../models/Category.js');
const Address = require('../models/Address.js');

const db = {};

db.connection = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect
  }
);

db.User = User(db.connection, DataTypes);
db.Post = Post(db.connection, DataTypes);
db.Step = Step(db.connection, DataTypes);
db.Image = Image(db.connection, DataTypes);
db.Origin = Origin(db.connection, DataTypes);
db.Recolector = Recolector(db.connection, DataTypes);
db.Tag = Tag(db.connection, DataTypes);
db.Service = Services(db.connection, DataTypes);
db.Item = Items(db.connection, DataTypes);
db.Category = Category(db.connection, DataTypes);
db.Address = Address(db.connection, DataTypes);

db.User.associate(db);
db.Post.associate(db);
db.Step.associate(db);
db.Image.associate(db);
db.Origin.associate(db);
db.Recolector.associate(db);
db.Tag.associate(db);
db.Service.associate(db);
db.Item.associate(db);
db.Category.associate(db)
db.Address.associate(db)


module.exports = db; 