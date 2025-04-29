const express = require('express');
const cors = require('cors'); // <-- ADD this line
const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://eduwriterspro.com', // Allow only your frontend
}));

// Middleware
app.use(express.json()); // Enable parsing of JSON request bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.send('EduWriterPro Backend Running ✅');
});

// Example API route (you can remove or expand this later)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Export the app for server.js to use
module.exports = app;
