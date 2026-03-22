const express = require('express');
const app = express();
const usermodel = require("./models/user.model")
const authROUTER = require("./routes/auth.route")
const movieROUTER = require("./routes/movie.route")
const cookieparser = require('cookie-parser');
const cors = require("cors");

app.use(
  cors({
    origin: "https://project-1-puce-three.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authROUTER);
app.use("/api/movies", movieROUTER);
module.exports = app;