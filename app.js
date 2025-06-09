const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/Article'); // <-- MongoDB model
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

app.get('/articles', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'articles.html'));
});


// ✅ Dynamic Articles: Article List Page
app.get('/articles', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });

  let html = `
    <html><head><title>Articles</title></head><body>
    <h1>Writing Help & Resources</h1><ul>
  `;

  articles.forEach(article => {
    html += `<li><a href="/articles/${article.slug}">${article.title}</a></li>`;
  });

  html += '</ul></body></html>';
  res.send(html);
});

// ✅ Dynamic Article Detail Page
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
    </body>
    </html>
  `);
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

// ✅ POST: Login
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
