const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Required to resolve file paths
const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://eduwriterpro.com',
  credentials: true
}));

// Middleware
app.use(express.json()); // Enable parsing of JSON request bodies

// Serve static HTML files from the 'views' folder
// Example: /views/post-assignment.html
app.use(express.static(path.join(__dirname, 'views')));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('EduWriterPro Backend Running ✅');
});

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// ✅ Route to serve the "Post an Assignment" page
app.get('/post-assignment', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'post-assignment.html'));
});

// Export the app for server.js to use
module.exports = app;
