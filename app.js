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

// Basic route for testing
app.get('/', (req, res) => {
  res.send('EduWriterPro Backend Running ✅');
});

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/how-it-works', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'how-it-works.html'));
});

app.get('/post-assignment', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'post-assignment.html'));
});

// Export the app for server.js to use
module.exports = app;
