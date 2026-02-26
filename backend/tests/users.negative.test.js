const request = require("supertest");
const app = require("../app");
const users = require("../mock/users.json");

describe("Negative user tests", () => {
  const invalidUsers = users.filter((u) => {
    // same rules as your middleware:
    const badName = !u.name || typeof u.name !== "string" || u.name.trim().length < 2;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const badEmail =
      !u.email || typeof u.email !== "string" || !emailRegex.test(u.email.trim());

    const numAge = Number(u.age);
    const badAge = !Number.isInteger(numAge) || numAge < 18 || numAge > 120;

    return badName || badEmail || badAge;
  });

  invalidUsers.forEach((user, idx) => {
    test(`Reject invalid user #${idx + 1}`, async () => {
      const res = await request(app).post("/users").send(user);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });
});
