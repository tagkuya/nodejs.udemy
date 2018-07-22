var { SESSION_SECRET } = require("./config/app.config.js").security;
var accesslogger = require("./lib/log/accesslogger.js");
var systemlogger = require("./lib/log/systemlogger.js");
var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var app = express();

app.set("view engine", "ejs");
app.disabled("x-powerd-by");

app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use(accesslogger());

app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: "sid"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/index.js"));
app.use("/posts", require("./routes/posts.js"));
app.use("/search", require("./routes/search"));
app.use("/account", require("./routes/account"));

app.use(systemlogger());

app.listen(3000);