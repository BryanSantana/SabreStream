const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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

module.exports = UserEvent;
