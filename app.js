const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// ✅ Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://eduwriterpro.com',
  credentials: true
}));

// ✅ Middleware for parsing form and JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (like CSS, JS, images) from /public if needed
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ✅ Page routes
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

// ✅ POST route to handle assignment form submission
app.post('/submit-assignment', (req, res) => {
  const { title, details } = req.body;
  console.log('New assignment submitted:', title, details);
  
  // TODO: Save to database here (MongoDB, etc.)

  res.send('Assignment submitted successfully ✅');
});

// ✅ Contact form (optional)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submitted:', name, email, message);

  // TODO: Process the contact request here

  res.send('Thanks for contacting us!');
});

module.exports = app;
