const express = require('express');
const app = express();

// Force port binding for Render and other platforms
app.set('port', process.env.PORT || 5000);

// Middleware (optional, you can add later)
// app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('EduWriterPro Backend Running ✅');
});

// Export the app for server.js to use
module.exports = app;
