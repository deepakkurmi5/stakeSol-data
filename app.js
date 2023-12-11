const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });
const express = require("express");
const app = express();
var http = require("http");
var logger = require("morgan");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const Database = require("./db");
const CronJobsFunction = require("./cronjob");
const cors = require("cors");
const { CORS_OPTIONS, PORT } = require("./config");
const { normalizePort } = require("./helpers");
const compression = require("compression");
const favicon = require("serve-favicon");

const port = normalizePort(PORT);

app.use("/static", express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(cors(CORS_OPTIONS));
app.use(parser.json());
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(parser.urlencoded({ extended: false }));
app.use(cookieParser());
Database.connect();

app.get("/", (req, res) => {
  return res.status(200).send("Runing store-backend.stakesol.app");
});

app.set("port", port);

const server = http.createServer(app);

CronJobsFunction();

module.exports = {
  server,
  port,
};
