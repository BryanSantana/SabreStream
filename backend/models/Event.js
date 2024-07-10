const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Club = require('./Club');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Event.belongsTo(Club, { foreignKey: 'clubId' });

module.exports = Event;
