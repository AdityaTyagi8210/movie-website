const express = require("express");
const movieRouter = express.Router();
const { searchMovies, getMovieById } = require("../controller/movie.controller");

movieRouter.get("/search", searchMovies);
movieRouter.get("/:id", getMovieById);

module.exports = movieRouter;
