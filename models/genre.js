const mongoose = require("mongoose");
const Joi = require("joi"); // Pascal case for classes

// Define schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error, value } = schema.validate(genre);
  return { error, value };
}

exports.Genre = Genre;
exports.validate = validateGenre;