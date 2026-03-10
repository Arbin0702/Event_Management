function validateUser(req, res, next) {
  const { name, email, age } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!email || !email.includes("@")) {
    errors.push({ field: "email", message: "Valid email required" });
  }

  if (!age || age < 18 || age > 120) {
    errors.push({ field: "age", message: "Age must be between 18 and 120" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = validateUser;