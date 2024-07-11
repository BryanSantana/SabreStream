const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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

module.exports = QrCode;
