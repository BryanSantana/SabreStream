const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startTime:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  endDate:{
    type:DataTypes.DATE
  },
  endTime:{
    type:DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Event;
