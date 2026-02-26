const express = require("express");
const validateUser = require("./middleware/validateUser");

const app = express();
app.use(express.json()); // IMPORTANT

app.post("/users", validateUser, (req, res) => {
  return res.status(201).json({ message: "User created", user: req.body });
});

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
