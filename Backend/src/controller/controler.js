const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function registercontroler(req, res) {
  const { username, email, password, } = req.body;

  const existingUser = await usermodel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(400).json({
      message:
        existingUser.email == email
          ? "Email already exists"
          : "Username already exists",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await usermodel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
}



async function logincontroler(req, res) {
  const { username, email, password } = req.body;
  const user = await usermodel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "LogedIn successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = { logincontroler, registercontroler };
