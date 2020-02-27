const { Sequelize } = require('sequelize');

const DB_NAME = 'cosme';
const DB_USERNAME = 'root';
const DB_PASSWORD = '12345678';
const DB_DIALECT = 'mysql';
const DB_HOST = 'localhost';
const DB_PORT = '3306';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  logging: false
});

module.exports = sequelize;
