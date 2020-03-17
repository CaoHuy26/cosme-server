const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./src/routes');
const logger = require('./src/configs/logger');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger);
app.use(cors());
app.use('/', router);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`🚀 App is running on port ${PORT}...`);
});
