const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3000, (err) => {
  if (err) {
    throw err;
  }
  console.log('🚀App is running on port 3000...');
});
