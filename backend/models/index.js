const sequelize = require('../config/database');
const User = require('./User');
const Event = require('./Event');
const Family = require('./Family');
const Club = require('./Club');
const Payment = require('./Payment');

const db = {
  sequelize,
  User,
  Event,
  Family,
  Club,
  Payment,
};

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;

