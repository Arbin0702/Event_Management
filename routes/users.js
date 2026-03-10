const express = require("express");
const validateUser = require("../middleware/validateUser");

const router = express.Router();

router.post("/users", validateUser, (req, res) => {
  res.json({ message: "User created successfully" });
});

module.exports = router;