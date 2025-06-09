const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/Article'); // MongoDB model

const app = express();

// === Enable CORS for frontend ===
app.use(cors({
  origin: 'https://eduwriterpro.com',
  credentials: true
}));

// === Middleware for forms + JSON ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Static Files (favicon, CSS, JS) ===
app.use(express.static(path.join(__dirname, 'public')));

// === Static HTML Pages ===
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/how-it-works', (req, res) => res.sendFile(path.join(__dirname, 'views', 'how-it-works.html')));
app.get('/post-assignment', (req, res) => res.sendFile(path.join(__dirname, 'views', 'post-assignment.html')));
app.get('/articles', (req, res) => res.sendFile(path.join(__dirname, 'views', 'articles.html')));

// === Admin-only Article Creation (GET with password) ===
app.get('/create-article', (req, res) => {
  const password = req.query.password;
  if (password !== 'secret123') {
    return res.status(401).send('Unauthorized: Invalid admin password');
  }
  res.sendFile(path.join(__dirname, 'views', 'create-article.html'));
});

// === Handle Article Creation (POST) ===
app.post('/create-article', async (req, res) => {
  const { title, slug, content } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).send('All fields are required');
  }

  try {
    await Article.create({ title, slug, content });
    res.redirect('/articles');
  } catch (err) {
    console.error('Failed to save article:', err);
    res.status(500).send('Server error saving article');
  }
});

// === Individual Article Viewer ===
app.get('/articles/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).send('Article not found');
    }

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${article.title}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 2rem auto; padding: 1rem; background: #f9f9fb; color: #2d3748; }
          h1 { color: #4a5568; }
          a { color: #5a67d8; text-decoration: none; }
        </style>
      </head>
      <body>
        <h1>${article.title}</h1>
        <article>${article.content}</article>
        <br/>
        <a href="/articles">← Back to Articles</a>
        <br/><br/>
        <a href="https://wa.me/19472803413?text=Hi%2C%20I%20read%20your%20article%20and%20need%20assignment%20help." target="_blank">
          📱 Chat on WhatsApp
        </a>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error loading article');
  }
});

// === Form Handlers ===
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).send('All fields required');
  console.log('Signup:', name, email);
  res.status(200).send('Signup successful ✅');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Missing credentials');
  console.log('Login:', email);
  res.status(200).send('Login accepted ✅');
});

app.post('/submit-assignment', (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) return res.status(400).send('Missing assignment info');
  console.log('Assignment submitted:', title);
  res.status(200).send('Assignment received ✅');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).send('All fields required');
  console.log('Contact:', name, email, message);
  res.status(200).send('Thanks for reaching out ✅');
});

module.exports = app;
