const express = require("express");
const router = express.Router();
const { Properties } = require("../models");

router.get("/", async (req, res) => {
  //   res.send("Hello World"); // You can use res.json for json format of the output
  const listOfProperties = await Properties.findAll();
  res.json(listOfProperties);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const property = await Properties.findByPk(id);
  res.json(property);
});

router.post("/", async (req, res) => {
  // Inserting data logic
  const property = req.body;
  await Properties.create(property);
  res.json(property);
});

module.exports = router;
