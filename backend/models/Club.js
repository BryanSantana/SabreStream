const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
});

Club.hasMany(Payment, {foreignKey: 'cludId'});
module.exports = Club;
