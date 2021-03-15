require("dotenv").config();
// imports
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { readdir } = require("fs");
// global variables
const port = process.env.PORT || 5000;
const staticDir = path.resolve("./client/public");
const app = express();
mongoose.set("useFindAndModify", false);

// Database setup
// connection
mongoose.connect("mongodb://localhost:27017/til");
// schema
const PostSchema = new mongoose.Schema({
  title: String,
  author: String, // keys match names in input fields of form
  date: Date,
  content: String,
  tags: Array,
});

// let timeDisplay = new Date()
// console.log(timeDisplay)
// model
const PostModel = mongoose.model("Post", PostSchema);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticDir));

app.post("/add", async (req, res) => {
  let newPost = new PostModel({
    title: req.body.title,
    author: req.body.author,
    date: Date.now(),
    content: req.body.content,
    tags: [req.body.tags],
  });
  await newPost.save();
  //   res.status(200).send('New entry added')
  res.redirect("/");
});

app.get("/api", async (req, res) => {
  // find all documents in the chats collection (as defined above)
  const cursor = await PostModel.find({});
  // create empty array to hold our results
  let results = [];
  // iterate over out cursor object to push each document into our array
  await cursor.forEach((post) => {
    results.push(post);
  });

  // console.log(results)
  // send the resulting array back
  res.json(results);
});

//return a specific posts's data
app.get("/api/:id", async (req, res) => {
  let id = req.params.id;
  let data = await PostModel.findOne({ _id: id });
  res.json(data);
});

app.post("/edit/:id", async (req, res) => {
  let id = req.params.id;
  await PostModel.findOneAndUpdate(
    { _id: id },
    {
        title:req.body.title,
      author: req.body.author,
      date: Date.now(),
      content: req.body.content,
      tags: [req.body.tags],
    },
    {
      new: true,
    }
  );
  res.redirect("/Data");
});

app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await PostModel.findOneAndDelete({ _id: id });
});

app.get("/*", (req, res) => {
  res.send("Sorry this is not found");
});

app.listen(port, () => {
  console.log("server is running");
});
