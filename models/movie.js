const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

// Define schema.
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  const { error, value } = schema.validate(movie);
  return { error, value };
}
