# Final project - Movie API

A simple REST API for managing a movie collection.  
You can add, view, update, and delete movies stored in a local database.

The project is built using Express and SQLite.

---

## What this project does

This API lets you manage a list of movies with the following details:

- Title
- Release year
- Genre
- Rating
- Watched status

---

## What you can do

With this API you can:

- Get all movies
- Filter movies by genre
- Get a single movie by ID
- Add new movies
- Update existing movies
- Delete movies

---

## API Routes

---

### GET /movies

Returns all movies in the database.

Optional filter:
- `?genre=Action` → filter movies by genre

---

### GET /movies/:id

Returns one movie by its ID.

---

### POST /movies

Adds a new movie.

Required fields:
- title
- release_year
- watched (true/false)

Optional fields:
- genre
- rating

---

### PUT /movies/:id

Updates an existing movie by ID.

All main fields must be included in the request.

---

### DELETE /movies/:id

Deletes a movie by ID.

---

## Database

Uses SQLite with one table:

- movies

Columns:

- id (auto increment)
- title
- release_year
- genre
- rating
- watched

---

## Summary

This project is a basic backend movie manager built for learning how REST APIs work with databases.