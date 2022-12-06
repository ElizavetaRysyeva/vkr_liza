const Sequelize  = require('sequelize');
const sequelize = new Sequelize('db', 'user', 'pass', {
  dialect: 'sqlite',
  host: '/backend/tour.db',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.hotels = require("./hotel.model.js")(sequelize, Sequelize);
db.rooms = require("./room.model.js")(sequelize, Sequelize, db.hotels);
db.orders = require("./order.model.js")(sequelize, Sequelize, db.hotels, db.rooms);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
