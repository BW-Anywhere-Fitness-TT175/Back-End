const pgConnection = process.env.DATABASE_URL;
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    connection: {
      filename: "./data.fitness.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  testing: {
    client: sqlite3,
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    connection: {
      filename: "./data/testing.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: pgConnection,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};