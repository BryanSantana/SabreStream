const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Club = require('./Club');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
});

Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Club, { foreignKey: 'clubId' });

module.exports = Payment;

