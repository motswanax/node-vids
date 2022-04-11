const express = require("express");
const Joi = require("joi"); // Pascal case for classes

const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Adventure" },
];

// Get all.
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Get one.
app.get("/api/genres/:id", (res, req) => {
  const genre = genres.find((x) => x.id === parseInt(req.params.id));
  if (!genre)
    return res
      .statusCode(404)
      .send("The genre with the specified ID was not found.");

  res.send(genre);
});

// Create.
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].mesage);

  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

// Update record.
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((x) => x.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID was not found");

  // Validate input.
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].mesage);

  // Update.
  genre.name = req.body.name;

  return send(genre);
});

// Delete record
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((x) => x.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID was not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error, value } = schema.validate(genre);
  return { error, value };
}

// Event listener for HTTP requests.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
