var router = require("express").Router();

var validateRegistData = function (body) {
  var isValidated = true, erros = {};

  if (!body.url) {
    isValidated = false;
    erros.url = "URLが未入力です。'/'から始まるURLを入力してください。";
  }

  if (body.url && /^\//.test(body.url) === false) {
    isValidated = false;
    erros.url = "'/'から始まるURLを入力してください。";
  };

  if (!body.title) {
    isValidated = false;
    erros.title = "タイトルが未入力です。タイトルを入力してください。";
  }

  return isValidated ? undefined : erros;

};

var createRegistData = function (body) {
  var datetime = new Date();
  return {
    url: body.url,
    published: datetime,
    update: datetime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || "").split(''),
    authors: (body.authors || "").split('')
  };
};

router.get("/", (req, res) => {
  res.render("./account/index.ejs");
});

router.get("/posts/regist", (req, res) => {
  res.render("./account/posts/regist-form.ejs");
});

router.post("/posts/regist/input", (req, res) => {
  var original = createRegistData(req.body);
  res.render("./account/posts/regist-form.ejs", { original });
});

router.post("/posts/regist/confirm", (req, res) => {
  let original = createRegistData(req.body);
  var errors = validateRegistData(req.body);
  if (errors) {
    res.render("./account/posts/regist-form.ejs", { errors, original });
    return;
  }
  res.render("./account/posts/regist-confirm.ejs", { original });
});

module.exports = router;