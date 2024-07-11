const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Event = require('./Event');

const UserEvent = sequelize.define('UserEvent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  signedUp: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  checkedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

UserEvent.belongsTo(User, { foreignKey: 'userId' });
UserEvent.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = UserEvent;
