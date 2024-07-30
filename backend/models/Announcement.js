const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  likesCount:{
    type:DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps:false,
});


module.exports = Announcement;  