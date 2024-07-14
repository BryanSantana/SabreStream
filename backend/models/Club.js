const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Club = sequelize.define('Club', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  stripeAccountId: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Club;
