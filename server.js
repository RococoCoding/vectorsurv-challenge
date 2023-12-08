const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { validationResult } = require('express-validator');
const validateMovieData = require('./middleware');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('movies.db');

// Create a table for movies
db.run(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    releaseDate TEXT,
    rating INTEGER,
    genre TEXT,
    studioEmail TEXT
  )
`);

// Retrieve all movies from the database
app.get('/movies', (req, res) => {
  db.all('SELECT * FROM movies', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json(rows);
  });
});

// Handle movie submissions
app.post('/movies', validateMovieData, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, releaseDate, rating, genre, studioEmail } = req.body;
  db.run(
    'INSERT INTO movies (title, releaseDate, rating, genre, studioEmail) VALUES (?, ?, ?, ?, ?)',
    [title, releaseDate, rating, genre, studioEmail],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.status(201).json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
