const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi"); // Pascal case for classes
const genres = require("./routes/genres");
const customers = require("./routes/customers");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const app = express();
app.use(express.json());

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

// Event listener for HTTP requests.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
