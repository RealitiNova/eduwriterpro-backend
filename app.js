const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'https://eduwriterpro.com',
  credentials: true,
}));

// ✅ Middleware for form + JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (e.g. /public/favicon.ico, styles, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Page Routes (GET)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
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

// ✅ POST: Signup form handler
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Please fill in all fields');
  }

  console.log('New user signup:', { name, email });

  // TODO: Save user to DB
  res.status(200).send('Signup successful ✅');
});

// ✅ POST: Login (optional logic placeholder)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }

  console.log('Login attempt:', email);

  // TODO: Verify user credentials
  res.status(200).send('Login accepted ✅');
});

// ✅ POST: Assignment submission
app.post('/submit-assignment', (req, res) => {
  const { title, details } = req.body;

  if (!title || !details) {
    return res.status(400).send('Missing assignment details');
  }

  console.log('New assignment submitted:', title, details);

  // TODO: Save to DB
  res.status(200).send('Assignment submitted ✅');
});

// ✅ POST: Contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All contact fields required');
  }

  console.log('Contact message:', name, email, message);

  // TODO: Store or email
  res.status(200).send('Contact received ✅');
});

module.exports = app;
