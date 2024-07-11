const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Family = require('./Family');
const Club = require('./Club');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('member', 'coach', 'admin', 'parent'),
    defaultValue: 'member',
  },
});

User.belongsTo(Family, { foreignKey: 'familyId' });
User.belongsTo(Club, { foreignKey: 'clubId' });
User.hasMany(Payment, {foreignKey: 'userId'});
User.hasOne(QrCode, { foreignKey: 'userId' });
module.exports = User;

