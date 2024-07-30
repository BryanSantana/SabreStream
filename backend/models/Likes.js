const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Likes = sequelize.define('Likes', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    announcementId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    }, {
        timestamps:false,
})

module.exports = Likes;