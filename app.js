var { CONNECTION_URL, OPTIONS } = require("./config/mongodb.config.js");
var { SESSION_SECRET } = require("./config/app.config.js").security;
var accesslogger = require("./lib/log/accesslogger.js");
var systemlogger = require("./lib/log/systemlogger.js");
var accountcontrol = require("./lib/security/accountcontrol.js");
var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var app = express();
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

app.set("view engine", "ejs");
app.disabled("x-powerd-by");

app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use(accesslogger());

app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: "sid",
  store: new MongoStore({
    url: CONNECTION_URL,
    mongoOptions:OPTIONS
  })
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(...accountcontrol.initialize());

app.use("/api", (() => {
  var router = express.Router();
  router.use("/posts", require("./api/posts.js"));
  return router;
})());

app.use("/", (() => {
  var router = express.Router();
  router.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    next();
  });
  router.use("/", require("./routes/index.js"));
  router.use("/posts", require("./routes/posts.js"));
  router.use("/search", require("./routes/search"));
  router.use("/account", require("./routes/account"));
  return router;
})());

app.use(systemlogger());

app.use((req, res, next) => {
  var data = {
    method: req.method,
    protocol: req.protocol,
    version: req.httpVersion,
    url: req.url
  };
  res.status(404);
  if (req.xhr) {
    res.json(data);
  } else {
    res.render("./404.ejs", { data });
  }
});

app.use((err, req, res, next) => {
  var data = {
    method: req.method,
    protocol: req.protocol,
    version: req.httpVersion,
    url: req.url,
    error: (process.env.NODE_ENV === "development") ? {
      name: err.name,
      message: err.message,
      stack: err.stack
    } : undefined
  };

  res.status(500);
  if (req.xhr) {
    res.json(data);
  } else {
    res.render("./500.ejs", { data });
  }
})
app.listen(3000);