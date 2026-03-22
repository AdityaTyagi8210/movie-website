const express = require('express');
const app = express();
const cors = require("cors");
const cookieparser = require('cookie-parser');
const authROUTER = require("./routes/auth.route");
const movieROUTER = require("./routes/movie.route");

const corsOptions = {
  origin: "https://project-1-puce-three.vercel.app",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.options('/{*path}', cors(corsOptions));

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authROUTER);
app.use("/api/movies", movieROUTER);

module.exports = app;
