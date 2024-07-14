const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
  stripePaymentIntentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recipientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recipientType: {
    type: DataTypes.ENUM('coach', 'club'),
    allowNull: false,
  },
});

module.exports = Payment;

