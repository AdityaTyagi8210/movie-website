const axios = require("axios");

async function searchMovies(req, res) {
  try {
    const query = req.query.q;
    const type = req.query.type;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`;
    if (type) {
      url += `&type=${type}`;
    }

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ message: "Error fetching movies" });
  }
}

async function getMovieById(req, res) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ message: "Error fetching movie details" });
  }
}

module.exports = { searchMovies, getMovieById };
