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
          name: "chad diaz",
          phone_number: "2015551212",
          role_id: 1,
        },
        {
          id: 2,
          email: "sarahrose@test.com",
          password: bcrypt.hashSync("test1234", 10),
          name: "sarah rose",
          phone_number: "2015551313",
          role_id: 1,
        },
        {
          id: 3,
          email: "sarah@test.com",
          password: bcrypt.hashSync("test1234", 10),
          name: "sarah guidry",
          phone_number: "2015551414",
          role_id: 2,
        },
        {
          id: 4,
          email: "victoria@test.com",
          password: bcrypt.hashSync("test1234", 10),
          name: "victoria trac",
          phone_number: "2015551515",
          role_id: 2,
        },
        {
          id: 5,
          email: "ajablanco@test.com",
          password: bcrypt.hashSync("test1234", 10),
          name: "aja blanco",
          phone_number: "2015551616",
          role_id: 1,
        },
      ]);
    });
};
