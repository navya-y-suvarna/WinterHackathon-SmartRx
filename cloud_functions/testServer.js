const express = require("express");
const bodyParser = require("body-parser");
const { validateOrder } = require("./validateOrder");

const app = express();
app.use(bodyParser.json());

app.post("/validate", validateOrder);

app.listen(3000, () => {
  console.log("Test server running on http://localhost:3000/validate");
});
