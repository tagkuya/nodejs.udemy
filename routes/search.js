var {
  CONNECTION_URL,
  DATABASE,
  OPTIONS
} = require("../config/mongodb.config.js");
var {
  MAX_ITEM_PER_PAGE
} = require("../config/app.config.js").search;
var router = require("express").Router();
var MongoClient = require("mongodb").MongoClient;

router.get("/*", (req, res) => {
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var keyword = req.query.keyword || "";

  var regexp = new RegExp(`.* ${keyword}.*`);
  var query = {
    $or: [{
      title: regexp
    }, {
      content: regexp
    }]
  };
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    var db = client.db(DATABASE);

    Promise.all([
      db.collection("posts")
        .find(query)
        .count(),
      db.collection("posts")
        .find(query)
        .skip((page - 1) * MAX_ITEM_PER_PAGE)
        .limit(MAX_ITEM_PER_PAGE)
        .sort({published: -1})
        .toArray()
    ]).then((results) => {
      var data = {
        keyword,
        count: results[0],
        list: results[1],
        pagenation: {
          max: Math.ceil(results[0] / MAX_ITEM_PER_PAGE),
          current: page
        }
      };
      res.render("./search/list.ejs", data);
    }).catch((error) => {
      throw error;
    }).then(() => {
      client.close();
    });
  });
});
module.exports = router;