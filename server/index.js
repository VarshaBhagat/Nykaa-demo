const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3002;

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.listen(port, () =>
  console.info(`Hello world app listening on port ${port}!`)
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var data = JSON.parse(fs.readFileSync("data/products-dataset.json", "utf8"));

app.get("/data", (req, res) => {
  res.json(data);
});
