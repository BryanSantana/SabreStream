const sequelize = require('../config/db');
const User = require('./User');
const Club = require('./Club');
const Event = require('./Event');
const Family = require('./Family');
const Payment = require('./Payment');
const QrCode = require('./QrCode');
const UserEvent = require('./UserEvent');
const Announcement = require('./Announcement')
const Likes = require ('./Likes')

Club.hasMany(Payment, {foreignKey: 'clubId'});
Event.belongsTo(Club, { foreignKey: 'clubId' });
Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Club, { foreignKey: 'clubId' });
QrCode.belongsTo(User, { foreignKey: 'userId' });
User.belongsTo(Family, { foreignKey: 'familyId' });
User.belongsTo(Club, { foreignKey: 'clubId' });
User.hasMany(Payment, {foreignKey: 'userId'});
User.hasOne(QrCode, { foreignKey: 'userId' });
UserEvent.belongsTo(User, { foreignKey: 'userId' });
UserEvent.belongsTo(Event, { foreignKey: 'eventId' });
Announcement.belongsTo(User, { foreignKey: 'userId' });
Announcement.belongsTo(Club,{ foreignKey: 'clubId'})
User.hasMany(Likes, {foreignKey: 'likeId'});
Announcement.hasMany(Likes, {foreignKey: 'likeId'});
Likes.belongsTo(User, { foreignKey: 'userId' });
Likes.belongsTo(Announcement, { foreignKey: 'announcementId' });

const db = {
  sequelize,
  User,
  Event,
  Family,
  Club,
  QrCode,
  UserEvent,
  Announcement,
  Payment,
};


db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;

