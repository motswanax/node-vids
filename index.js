const express = require("express");
const Joi = require("joi"); // Pascal case for classes
const genres = require("./routes/genres");

const app = express();
app.use(express.json());

app.use(express.json());
app.use("/api/genres", genres);

// Event listener for HTTP requests.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
