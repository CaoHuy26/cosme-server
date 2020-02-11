const express = require('express');
const app = express();

const router = require('./src/routes');

app.use('/', router);

app.listen(3000, (err) => {
  if (err) {
    throw err;
  }
  console.log('🚀App is running on port 3000...');
});
