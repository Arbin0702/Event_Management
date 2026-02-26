function validateUser(req, res, next) {
  const { name, email, age } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  const numAge = Number(age);
  if (!Number.isInteger(numAge) || numAge < 18 || numAge > 120) {
    errors.push({ field: "age", message: "Age must be between 18 and 120" });
  }

  if (errors.length > 0) return res.status(400).json({ errors });

  next();
}

module.exports = validateUser;
