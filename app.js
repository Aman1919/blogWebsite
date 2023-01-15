const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://admin-aman:Aman1234@cluster0.zd3vjzk.mongodb.net/blogData"
);
const homeSchema = {
  title: String,
  para: String,
};
const Data = mongoose.model("data", homeSchema);
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const homeContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit facilis ea aspernatur illum fugit. Quae perferendis omnis eveniet. Ipsa vitae placeat aspernatur excepturi beatae soluta facere, nulla sapiente quasi suscipit repudiandae eaque dignissimos cupiditate eius corrupti ratione  dkndkvkdv  necessitatibus porro! Autem deserunt necessitatibus, quae quisquam deleniti veritatis beatae nostrum! Praesentium, officiis!";
app.get("/", (req, res) => {
  Data.find({}, function (err, post) {
    res.render("home", { hmCnt: homeContent, posts: post });
  });
});
app.get("/about", (req, res) => {
  res.render("about", { aboutPara: homeContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { ContactPara: homeContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  const data = new Data({
    title: req.body.publish,
    para: req.body.pos,
  });
  data.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});
app.get("/:testing", (req, res) => {
  const check = req.params.testing;
  Data.findOne({ id: check }, function (err, post) {
    res.render("post", { t: post.title, c: post.para });
  });
});
app.listen(3000, () => {
  console.log("Listening at port 3000");
});
