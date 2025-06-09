const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/Article'); // MongoDB model
const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: 'https://eduwriterpro.com',
  credentials: true,
}));

// ✅ Middleware for form & JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static assets (favicon, styles, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Static Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'views', 'signup.html')));
app.get('/how-it-works', (req, res) => res.sendFile(path.join(__dirname, 'views', 'how-it-works.html')));
app.get('/post-assignment', (req, res) => res.sendFile(path.join(__dirname, 'views', 'post-assignment.html')));
app.get('/create-article', (req, res) => res.sendFile(path.join(__dirname, 'views', 'create-article.html')));

// ✅ GET: Dynamic Article List
app.get('/articles', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });

  let html = `
    <html>
      <head><title>Articles</title></head>
      <body>
        <h1>Writing Help & Resources</h1>
        <ul>
  `;

  articles.forEach(article => {
    html += `<li><a href="/articles/${article.slug}">${article.title}</a></li>`;
  });

  html += `
        </ul>
        <p><a href="/create-article">➕ Create New Article</a></p>
      </body>
    </html>
  `;

  res.send(html);
});

// ✅ GET: Individual Article by Slug
app.get('/articles/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  if (!article) {
    return res.status(404).send('Article not found');
  }

  res.send(`
    <html>
      <head><title>${article.title}</title></head>
      <body>
        <h1>${article.title}</h1>
        <article>${article.content}</article>
        <p><a href="https://wa.me/19472803413?text=Hi%2C%20I%20need%20help%20with%20a%20similar%20assignment" target="_blank">
          📱 Get Help on WhatsApp
        </a></p>
        <p><a href="/articles">← Back to Articles</a></p>
      </body>
    </html>
  `);
});

// ✅ POST: Create new article
app.post('/create-article', async (req, res) => {
  const { title, slug, content } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).send('Please fill in all fields');
  }

  try {
    await Article.create({ title, slug, content });
    res.redirect('/articles');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving article');
  }
});

// ✅ POST: Signup form
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).send('All fields required');

  console.log('New user:', { name, email });
  res.status(200).send('Signup successful ✅');
});

// ✅ POST: Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Missing credentials');

  console.log('Login:', email);
  res.status(200).send('Login accepted ✅');
});

// ✅ POST: Assignment
app.post('/submit-assignment', (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) return res.status(400).send('Missing assignment info');

  console.log('Assignment submitted:', title);
  res.status(200).send('Assignment received ✅');
});

// ✅ POST: Contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).send('All fields required');

  console.log('Contact:', name, email, message);
  res.status(200).send('Thanks for reaching out ✅');
});

module.exports = app;
