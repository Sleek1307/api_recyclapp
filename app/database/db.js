const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../config/config.js");

const User = require("../models/Users.js");
const Role = require("../models/Roles.js");
const Post = require("../models/Post.js");
const Step = require("../models/Step.js");
const Image = require("../models/Image.js");
const Tag = require("../models/Tag.js");
const Services = require("../models/Services.js");
const Products = require("../models/Products");
const Category = require("../models/Category.js");
const Address = require("../models/Address.js");
const TypeService = require("../models/TypeService");
const ServiceProducts = require("../models/ServiceProducts.js");
const RewardImage = require("../models/RewardImage");
const Reward = require("../models/Rewards");
const Agreements = require("../models/Agreements");
const RewardUser = require('../models/RewardUser');

const db = {};

db.connection = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

db.User = User(db.connection, DataTypes);
db.Role = Role(db.connection, DataTypes);
db.Post = Post(db.connection, DataTypes);
db.Step = Step(db.connection, DataTypes);
db.Image = Image(db.connection, DataTypes);
db.Tag = Tag(db.connection, DataTypes);
db.Service = Services(db.connection, DataTypes);
db.TypeService = TypeService(db.connection, DataTypes);
db.Product = Products(db.connection, DataTypes);
db.Category = Category(db.connection, DataTypes);
db.Address = Address(db.connection, DataTypes);
db.ServiceProducts = ServiceProducts(db.connection, DataTypes);
db.RewardImage = RewardImage(db.connection, DataTypes);
db.Reward = Reward(db.connection, DataTypes);
db.Agreement = Agreements(db.connection, DataTypes);
db.RewardUser = RewardUser(db.connection, DataTypes);

db.User.associate(db);
db.Post.associate(db);
db.Step.associate(db);
db.Image.associate(db);
db.Tag.associate(db);
db.Service.associate(db);
db.Product.associate(db);
db.Category.associate(db);
db.TypeService.associate(db);
db.Address.associate(db);
db.RewardImage.associate(db);
db.Agreement.associate(db);
module.exports = db;