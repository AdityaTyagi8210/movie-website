const express = require("express");
const authRouter = express.Router();
const {logincontroler,registercontroler,} = require("../controller/controler");

authRouter.post("/register", registercontroler);

authRouter.post("/login", logincontroler);
module.exports = authRouter;
