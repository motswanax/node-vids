const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

// Create.
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// Get all.
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get one.
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// Update record.
router.put("/:id", auth, async (req, res) => {
  // Validate input.
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].mesage);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID was not found");

  return res.send(genre);
});

// Delete record
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID was not found");

  res.send(genre);
});

module.exports = router;
