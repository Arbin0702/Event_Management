const express = require("express");
const validateUser = require("./middleware/validateUser");

const app = express();
app.use(express.json());

app.post("/users", validateUser, (req, res) => {
  return res.status(201).json({ message: "User created", user: req.body });
});

app.get("/", (req, res) => res.send("API running"));

module.exports = app;
