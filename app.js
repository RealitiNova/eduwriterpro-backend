const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/Article');

const app = express();

// === CORS Configuration ===
app.use(cors({
  origin: 'https://eduwriterpro.com',
  credentials: true,
}));

// === Middleware ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Serve Static Files ===
app.use(express.static(path.join(__dirname, 'public')));

// === Static Routes ===
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/how-it-works', (req, res) => res.sendFile(path.join(__dirname, 'views', 'how-it-works.html')));
app.get('/post-assignment', (req, res) => res.sendFile(path.join(__dirname, 'views', 'post-assignment.html')));
app.get('/articles', (req, res) => res.sendFile(path.join(__dirname, 'views', 'articles.html')));

// === Admin Login Page ===
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Admin Login</title></head>
    <body style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h2>Admin Access</h2>
      <form method="POST" action="/admin">
        <input type="password" name="password" placeholder="Enter admin password" required style="padding: 10px; width: 250px;" />
        <button type="submit" style="padding: 10px 20px; background: #5a67d8; color: white; border: none; cursor: pointer;">Login</button>
      </form>
    </body>
    </html>
  `);
});

// === Admin Password Validation ===
app.post('/admin', (req, res) => {
  const { password } = req.body;
  if (password === 'secret123') {
    return res.redirect('/create-article?password=secret123');
  } else {
    return res.status(401).send('❌ Incorrect admin password');
  }
});

// === Article Creation Page ===
app.get('/create-article', (req, res) => {
  const { password } = req.query;
  if (password !== 'secret123') {
    return res.status(401).send('Unauthorized');
  }
  res.sendFile(path.join(__dirname, 'views', 'create-article.html'));
});

// === Article Creation Handler ===
app.post('/create-article', async (req, res) => {
  const { title, slug, content } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).send('All fields are required');
  }
  try {
    await Article.create({ title, slug, content });
    res.redirect('/articles');
  } catch (err) {
    console.error('Error saving article:', err);
    res.status(500).send('Error saving article');
  }
});

// === Single Article Viewer ===
app.get('/articles/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).send('Article not found');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>${article.title}</title></head>
      <body style="font-family: sans-serif; max-width: 700px; margin: auto; padding: 2rem;">
        <h1>${article.title}</h1>
        <div>${article.content}</div>
        <hr/>
        <a href="/articles">← Back to Articles</a> |
        <a href="https://wa.me/19472803413?text=Hi%2C%20I%20read%20your%20article%20and%20need%20assignment%20help." target="_blank">📱 Chat on WhatsApp</a>
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
  res.send('Signup successful ✅');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Missing credentials');
  console.log('Login:', email);
  res.send('Login accepted ✅');
});

app.post('/submit-assignment', (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) return res.status(400).send('Incomplete assignment details');
  console.log('Assignment submitted:', title);
  res.send('Assignment received ✅');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).send('All fields required');
  console.log('Contact:', name, email, message);
  res.send('Thanks for contacting us ✅');
});

module.exports = app;
