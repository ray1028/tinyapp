const { assert } = require("chai");

const { findUserByEmail } = require("../helpers.js");

const testUsers = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe("getUserByEmail", function() {
  it("should return a users with valid email", function() {
    const user = findUserByEmail("user@example.com", testUsers);
    const expectedOutput = "userRandomID";

    // Write your assert statement here
    assert.strictEqual(user.id, expectedOutput);
  });

  it("should return undefined with invalid email", () => {
    const result = findUserByEmail("abc@example.com", testUsers);
    assert.isUndefined(result);
  });
});
