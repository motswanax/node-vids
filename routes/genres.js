const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi"); // Pascal case for classes

// Define schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

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

// Create.
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

// Update record.
router.put("/:id", async (req, res) => {
  // Validate input.
  const { error } = validateGenre(req.body);
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
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID was not found");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error, value } = schema.validate(genre);
  return { error, value };
}

module.exports = router;
