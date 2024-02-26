const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect, 
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.introduction = require('./introduction.model.js')(sequelize, Sequelize);
db.reason = require('./reason.model.js')(sequelize, Sequelize);
db.item = require('./item.model.js')(sequelize, Sequelize);
db.tab = require('./tab.model.js')(sequelize, Sequelize);
db.category = require('./category.model.js')(sequelize, Sequelize);
db.like = require('./like.model.js')(sequelize, Sequelize);
db.play = require('./play.model.js')(sequelize, Sequelize);
db.download = require('./download.model.js')(sequelize, Sequelize);
db.give = require('./give.model.js')(sequelize, Sequelize);
db.statehistory = require('./statehistory.model.js')(sequelize, Sequelize);
db.notification = require('./notification.model.js')(sequelize, Sequelize);

//associations
db.user.belongsToMany(db.reason, { through: 'user_reason' });
db.reason.belongsToMany(db.user, { through: 'user_reason' });

db.user.belongsToMany(db.introduction, { through: 'user_introduction' });
db.introduction.belongsToMany(db.user, { through: 'user_introduction' });

db.item.belongsToMany(db.tab, { through: 'item_tab' });
db.tab.belongsToMany(db.item, { through: 'item_tab' });

db.item.belongsTo(db.category);
db.statehistory.belongsTo(db.user);

db.user.hasMany(db.like);
db.like.belongsTo(db.item);

db.user.hasMany(db.play);
db.play.belongsTo(db.item);

db.user.hasMany(db.download);
db.download.belongsTo(db.item);

db.user.hasMany(db.give);
db.give.belongsTo(db.item);


module.exports = db;
