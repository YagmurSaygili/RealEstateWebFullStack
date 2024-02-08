const express = require("express");
const router = express.Router();
const { Properties, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfProperties = await Properties.findAll({ include: [Likes] });
  const likedProperties = await Likes.findAll({
    where: { UserId: req.user.id },
  });
  res.json({
    listOfProperties: listOfProperties,
    likedProperties: likedProperties,
  });
});
//What above router does is that it gets all the properties and sends it as a response to the client.

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const property = await Properties.findByPk(id);
  res.json(property);
});
//What above router does is that it gets the property by its id and sends it as a response to the client.

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfProperties = await Properties.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfProperties);
});
//What above router does is that it gets the properties by its user id and sends it as a response to the client.

router.post("/", validateToken, async (req, res) => {
  const property = req.body;
  property.username = req.user.username;
  property.UserId = req.user.id;
  await Properties.create(property);
  res.json(property);
});
//What above router does is that it creates a new property and sends it as a response to the client.

router.delete("/:id", validateToken, async (req, res) => {
  const propertyId = req.params.id;
  await Properties.destroy({
    where: {
      id: propertyId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});
//What above router does is that it deletes the property by its id and sends it as a response to the client.
module.exports = router;
