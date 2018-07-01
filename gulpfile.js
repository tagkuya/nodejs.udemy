var config = require("./gulp/config.js");
var gulp = require("gulp");
var load = require("require-dir");
var development, production;

load("./gulp/tasks", {recurse : true});

development =[

];

production = [
  "compile-sass"
];

gulp.task("default",config.env.IS_DEVELOPMENT ? development:production, ()=>{
  console.log(process.env.NODE_ENV);
});