const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const QrCode = sequelize.define('QrCode', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  qrCodeData: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

QrCode.belongsTo(User, { foreignKey: 'userId' });

module.exports = QrCode;
