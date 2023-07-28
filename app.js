const express = require("express");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = require("./router");
app.use(express.static("public"));
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));
dotenv.config({ path: "./env/.env" });

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.set("view engine", "pug");

app.use("/",router);


app.use(function (req, res, next) {
  if (!req.session.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

module.exports = app;
