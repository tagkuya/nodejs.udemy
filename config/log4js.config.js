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
      type: "multitype",
      base : path.join(ROOT, "./log/application/"),
      property : "key",
      extention : ".log"
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
    }
  }
};