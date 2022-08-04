require("dotenv").config();

var express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  createError = require("http-errors"),
  indexRouter = require("./routes/index").router,
  usersRouter = require("./routes/users"),
  lib = require("./lib");
let libObj = lib;

//1. mount environment specific configuration
//1.1. prepare envSettings
let envSettings = process.env;

//1.2. prepare DB
var mysqlHelper = require("./lib/mysqlHelper");
mysqlHelper.init(envSettings);
libObj.mysqlHelper = mysqlHelper;

//1.3. lib initial
lib.init(envSettings, libObj);
require("./routes/index").init(envSettings, libObj);

//2. set up express
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
