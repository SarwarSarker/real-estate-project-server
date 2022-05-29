const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//signup
router.post("/signup", async(req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({
          message: "Signup was successful!",
      });
  } catch {
      res.status(500).json({
          message: "Signup failed!",
      });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (user && isValidPassword) {
      const token = generateAuthToken(user);

      res.status(200).json({
        token: token,
        message: "Login Sucessfully",
      });
    } else {
      res.status(401).json({
        error: "Authetication failed!!!",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Authetication failed!",
    });
  }
});

//generate auth token
const generateAuthToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = router;
