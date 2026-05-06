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

app.listen(3000, () => {
console.log("Server is running on port 3000");
});