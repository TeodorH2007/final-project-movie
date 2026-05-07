const express = require('express');
const sqlite3 = require("sqlite3");
const app = express();
const PORT = 3000;
app.use(express.json());

const db = new sqlite3.Database("./movies.db");

db.run(`
    CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    genre TEXT,
    rating INTEGER,
    watched BOOLEAN DEFAULT FALSE)
`);

app.get("/", (req, res) => {
res.send("Hello from my server!");
});

app.get("/movies", (req, res) => {
  db.all("SELECT * FROM movies", (error, rows) => {
    if (rows.length === 0) {
      res.status(200).json({"message": "No movies found"});
      return;
    }
    res.json(rows);
  });
});

app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM movies WHERE id = ?";
  db.get(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "DB error" });
    }
    if (!rows) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(rows);
  });
});

app.post("/movies", (req, res) => {
  const title = req.body.title;
  const release_year = req.body.release_year;
  const genre = req.body.genre;
  const rating = req.body.rating;
  const watched = req.body.watched;
  console.log(title, release_year, genre, rating, watched);

  if(!title){
    res.status(400).json({"error": "Title is required"});
    return;
  }

  if(!release_year){
    res.status(400).json({"error": "Release year is required"});
    return;
  }

  if(!watched){
    res.status(400).json({"error": "Watched status is required"});
    return;
  }

  db.run("INSERT INTO movies (title, release_year, genre, rating, watched) VALUES (?, ?, ?, ?, ?)", [title, release_year, genre, rating, watched]);

  res.status(201).json({"message": "Movie added successfully"});
});

app.listen(3000, () => {
console.log("Server is running on port 3000");
});