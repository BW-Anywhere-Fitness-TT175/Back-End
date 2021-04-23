const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "chad@test.com",
          password: bcrypt.hashSync("test1234", 10),
          role_id: 1,
        },
        {
          id: 2,
          email: "sarahrose@test.com",
          password: bcrypt.hashSync("test1234", 10),
          role_id: 1,
        },
        {
          id: 3,
          email: "sarah@test.com",
          password: bcrypt.hashSync("test1234", 10),
          role_id: 2,
        },
        {
          id: 4,
          email: "victoria@test.com",
          password: bcrypt.hashSync("test1234", 10),
          role_id: 2,
        },
      ]);
    });
};
