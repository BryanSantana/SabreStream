const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Family = sequelize.define('Family', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Family;
