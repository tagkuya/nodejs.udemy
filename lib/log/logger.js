var log4js = require("log4js");
var config = require("../../config/log4js.config.js");
var console, system;

log4js.configure(config);

console = log4js.getLogger();

system = log4js.getLogger("system");

module.exports = {
  console,
  system
};