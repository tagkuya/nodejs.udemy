var path = require("path");
var ROOT = path.join(__dirname, "../");

module.exports = {
  appenders:{
    ConsoleLogAppender:{
      type:"console"
    },
    FileLogAppender:{
      type: "file",
      filename: path.join(ROOT, "./log/system/system.log"),
      maxLogSize : 5000000,
      backups: 10
    },
    MultFileLogAppender : {
      type: "multiFile",
      base : path.join(ROOT, "./log/application/"),
      property : "key",
      extention : ".log"
    },
    DateRollingFileAppender:{
      type: "dateFile",
      filename : path.join(ROOT, "./log/access/access.log"),
      patter: "-yyyyMMdd",
      daysToKeep: 30
    }
  },
  categories:{
    "default":{
      appenders:["ConsoleLogAppender"],
      level:"ALL"
    },
    system: {
      appenders : ["FileLogAppender"],
      level : "ERROR"
    },
    application : {
      appenders : ["MultFileLogAppender"],
      level : "ERROR"
    },
    access :{
      appenders :["DateRollingFileAppender"],
      level :"INFO"
    }
  }
};