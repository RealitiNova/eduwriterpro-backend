const express = require('express');
const app = express();

// Basic route for testing
app.get('/', (req, res) => {
  res.send('EduWriterPro Backend Running ✅');
});

module.exports = app;
