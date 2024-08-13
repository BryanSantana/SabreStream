const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tier = sequelize.define('Tier', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  frequency:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  stripeAccountId:{
    type:DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps:false,
});


module.exports = Tier;  