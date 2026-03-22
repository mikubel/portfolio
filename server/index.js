import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();

// Dev setup: Vite runs on 5173 by default
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());

const db = new Database('portfolio.sqlite');

db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }
  if (typeof email !== 'string' || !isEmail(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }
  if (typeof subject !== 'string' || subject.trim().length < 2) {
    return res.status(400).json({ error: 'Subject must be at least 2 characters.' });
  }
  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' });
  }

  const stmt = db.prepare(
    `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`
  );
  stmt.run(name.trim(), email.trim(), subject.trim(), message.trim());

  return res.json({ ok: true });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
