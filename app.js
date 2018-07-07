var systemlogger = require("./lib/log/systemlogger.js");
var express = require("express");
var app = express();

app.set("view engine","ejs");
app.disabled("x-powerd-by");

app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use("/",require("./routes/index.js"));

app.use(systemlogger());

app.listen(3000);