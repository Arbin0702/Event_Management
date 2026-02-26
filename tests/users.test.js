const request = require("supertest");
const app = require("../server");
const users = require("../mock/users.json");

describe("User validation tests", () => {
  users.forEach((user) => {
    test("Testing user", async () => {
      const res = await request(app).post("/users").send(user);

      if (!user.name || user.name.length < 2 || 
          !user.email.includes("@") || 
          user.age < 18) {
        expect(res.statusCode).toBe(400);
      } else {
        expect(res.statusCode).toBe(201);
      }
    });
  });
});
