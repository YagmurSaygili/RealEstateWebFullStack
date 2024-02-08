const express = require("express");
const router = express.Router();
const { Properties , Likes } = require("../models");


const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/",validateToken, async (req, res) => {
  //   res.send("Hello World"); // You can use res.json for json format of the output
  const listOfProperties = await Properties.findAll({include: [Likes]});

  const likedProperties = await Likes.findAll({where: {UserId: req.user.id}});
  res.json({listOfProperties: listOfProperties, likedProperties: likedProperties});
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const property = await Properties.findByPk(id);
  res.json(property);
});

router.post("/",validateToken, async (req, res) => {
  // Inserting data logic
  const property = req.body;
  property.username = req.user.username
  await Properties.create(property);
  res.json(property);
});

router.delete("/:id",validateToken, async (req, res) => {
  const propertyId = req.params.id;
  await Properties.destroy({
    where: {
      id: propertyId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
