var {CONNECTIN_URL,DATABASE,OPTIONS} = require("../../config/mongodb.config.js");
var MongoClient = require("mongodb").MongoClient;

var insertPosts = function(db){
  Promise.all([
    db.collection("posts").insertMany([{

    }]),
    db.collection("posts").createIndex({url: 1}, {unique : true, background : true})
  ]);
};

var insertUsers = function (db) {
  return Promise.all([
    db.collection("users").insertOne({
      email: "takuya@aaaa.com",
      name : "takuya shimobayashi",
      password :"123456",
      role : "owner"
    }),
    db.collection("users").createIndex({email : 1}, {unique :true, background : true})
  ]);
};

var insertPrivileges = function(db){
  return Promise.all([
    db.collection("users").insertMany([
      {role : "default", permissions : ["read"]},
      {role : "owner", permissions : ["readWrite"]}
    ]),
    db.collection("privileges")
      .createIndex({role : 1}, {unique : true, background : true})
  ]);
};
MongoClient.connect(CONNECTIN_URL,OPTIONS,(error, client) => {
  var db = client.db(DATABASE);
  Promise.all([
    insertPosts(db),
    insertUsers(db),
    insertPrivileges(db)
  ]).catch((error)=>{
    console.log(error);
  }).then(()=>{
    client.close();
  });
});