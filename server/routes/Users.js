const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware"); // To import from
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    // Security reasons
    Users.create({
      username: username,
      password: hash, // Passing hashed value of password instead of passing password directly, security
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  // Problem Solved
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    // If user doesn't exist, stop execution and send an error response
    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    // Await and async ???
    // If password doesn't match, stop execution and send an error response
    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" });
    }

    // If execution reaches here, login is successful

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    console.log("Does it come here ?");
    res.json({ token: accessToken, username: username, id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("An internal error occurred");
  }
});

router.get("/auth", validateToken, (req, res) => {
  // console.log("Does it come here ?"); --> No
  res.json(req.user);
});

module.exports = router;
