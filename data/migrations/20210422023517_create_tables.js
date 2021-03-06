exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments("id");
      tbl.text("role_name").notNullable();
    })
    .createTable("class_categories", (tbl) => {
      tbl.increments("id");
      tbl.text("cat_name", 24).notNullable().unique();
      tbl.integer("number_visits", 10).notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.text("email").notNullable().unique();
      tbl.text("password", 10).notNullable();
      tbl.text("name", 40).notNullable();
      tbl.text("phone_number", 10).notNullable();
      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("roles.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("classes", (tbl) => {
      tbl.increments("id");
      tbl.text("class_name", 20).notNullable().unique();
      tbl.text("start_time").notNullable();
      tbl.string("class_date").notNullable();
      tbl.decimal("duration").notNullable();
      tbl.integer("intensity_level").notNullable();
      tbl.text("location", 20).notNullable();
      tbl.integer("registered_students"); // NOTE Once registeredClients is equal to maxClassSize registration closes
      tbl.integer("max_class_size").notNullable();
      tbl
        .integer("instructor_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("class_categories.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("users_classes", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("class_id")
        .unsigned()
        .notNullable()
        .references("classes.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["user_id", "class_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_classes")
    .dropTableIfExists("classes")
    .dropTableIfExists("users")
    .dropTableIfExists("class_categories")
    .dropTableIfExists("roles");
};
