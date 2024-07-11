const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config({path: './.env'});

const useSSL = process.env.USE_SSL === 'true';  // Check if USE_SSL is set to 'true'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: useSSL? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

