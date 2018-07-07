var config = require("./gulp/config.js");
var gulp = require("gulp");
var load = require("require-dir");
var development, production;

load("./gulp/tasks", {recurse : true});

development =[
  "compile-sass",
  "copy-images",
  "copy-javascripts",
  "copy-third_party",
];

production = [
  "compile-sass",
  "copy-images",
  "minify-javascripts",
  "compile-sass"
];

gulp.task("default", config.env.IS_DEVELOPMENT ? development : production);