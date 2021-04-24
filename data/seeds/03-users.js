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
          first_name: "chad",
          last_name: "diaz",
          phone_number: "2015551212",
          role_id: 1,
        },
        {
          id: 2,
          email: "sarahrose@test.com",
          password: bcrypt.hashSync("test1234", 10),
          first_name: "sarah",
          last_name: "rose",
          phone_number: "2015551313",
          role_id: 1,
        },
        {
          id: 3,
          email: "sarah@test.com",
          password: bcrypt.hashSync("test1234", 10),
          first_name: "sarah",
          last_name: "guidry",
          phone_number: "2015551414",
          role_id: 2,
        },
        {
          id: 4,
          email: "victoria@test.com",
          password: bcrypt.hashSync("test1234", 10),
          first_name: "victoria",
          last_name: "trac",
          phone_number: "2015551515",
          role_id: 2,
        },
        {
          id: 5,
          email: "ajablanco@test.com",
          password: bcrypt.hashSync("test1234", 10),
          first_name: "aja",
          last_name: "blanco",
          phone_number: "2015551616",
          role_id: 1,
        },
      ]);
    });
};
