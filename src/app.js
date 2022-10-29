const dotenv = require("dotenv");
dotenv.config();
require("./models"); // to sync models

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const fetch = require("cross-fetch");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./models/authenticate")(passport);

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(info);
    if (user) {
      req.login(user, (err) => {
        if (err) throw err;
        res.send(info);
      });
    }
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) return err;
    res.redirect("/");
  });
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/frontend")));

app.use("/", indexRouter);
app.use("/api", usersRouter);



app.get("/verify", async (req, res, next) => {
  console.log(req.headers.token);
  fetch(`https://staging.avdhaan.grampower.com/users/auth/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: req.headers.token
    })
  })
    .then((response) => {
      if (response.status === 200) res.sendStatus(200);
      else res.sendStatus(403);
    })
    .catch((error) => {
      res.status(403);
      res.send(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/frontend/index.html");
});

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
