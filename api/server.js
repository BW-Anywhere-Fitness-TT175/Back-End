const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const helpersRouter = require("./helpers/helpersRouter.js");
const usersRouter = require("./users/usersRouter.js");
const classesRouter = require("./classes/classesRouter.js");
const authRouter = require("./auth/authRouter.js");

server.use(cors(), express.json(), helmet());

server.use("/api", helpersRouter);
server.use("/api/users", usersRouter);
server.use("/api/classes", classesRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res, next) => {
  res.status(200).json({ message: "api up" });
});

server.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Server failed...";
  res.status(errorStatus).json({ message: errorMessage, stack: error.stack });
});

module.exports = server;
