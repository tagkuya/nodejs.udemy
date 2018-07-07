var express = require("express");
var app = express();

app.set("view engine","ejs");

app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use("/",require("./routes/index.js"));

app.listen(3000);