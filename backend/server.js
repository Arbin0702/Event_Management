const express = require("express");
const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  const errors = [];

  if (!name || name.length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }

  if (!email || !email.includes("@")) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (!age || age < 18) {
    errors.push({ field: "age", message: "Must be 18 or older" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return res.status(201).json({ message: "User created successfully" });
});

module.exports = app;
