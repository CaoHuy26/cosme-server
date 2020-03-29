const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'cosme';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT =  process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  // logging: false
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error(`❌ Unable to connect to the database: ${error.original}`);
  }
};

testConnection();


module.exports = sequelize;
