require("dotenv").config();
// imports
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { readdir } = require("fs");
// global variables
const port = process.env.PORT || 5000;
const staticDir = path.resolve("./client/build");
const app = express();
mongoose.set("useFindAndModify", false);

// Database setup
// connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser:true, 
  useUnifiedTopology:true
});
// schema
const PostSchema = new mongoose.Schema({
  title: String,
  author: String, // keys match names in input fields of form
  date: Date,
  content: String,
  tags: [{
    type: String
}]
});

// establish model
const PostModel = mongoose.model("Post", PostSchema);
// import middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticDir));

// add a new post to the database
app.post("/add", async (req, res) => {
  let newPost = new PostModel({
    title: req.body.title,
    author: req.body.author,
    date:  new Date().getTime(),
    content: req.body.content,
    tags: req.body.tags.split(', ')
  });
  await newPost.save();

  res.redirect("/");
});

//  find all
app.get("/api", async (req, res) => {
  // find all documents in the chats collection (as defined above)
  const cursor = await PostModel.find({});
  // create empty array to hold our results
  let results = [];
  // iterate over out cursor object to push each document into our array
  await cursor.forEach((post) => {
    results.push(post);
  });

  console.log(results)
  // send the resulting array back
  res.json(results);
});

// find posts conditionally/filter
app.get("/filter", async(req, res) =>{
    let filter = req.query
    console.log(filter)
    let key = Object.keys(filter)[0].toLowerCase()
    console.log(key)
    let temp = filter[key]
    console.log(temp)
    const cursor = await PostModel.find({[key]: `${temp}`});
    let results = [];

  // iterate over out cursor object to push each document into our array
  await cursor.forEach((post) => {
    results.push(post);
})
console.log(results)    
res.json(results)
})

//return a specific posts's data
app.get("/api/:id", async (req, res) => {
  let id = req.params.id;
  let data = await PostModel.findOne({ _id: id });
  res.json(data);
});

// edit a post
app.post("/edit/:id", async (req, res) => {
  let id = req.params.id;
  await PostModel.findOneAndUpdate(
    { _id: id },
    {
        title:req.body.title,
      author: req.body.author,
      date: Date.now(),
      content: req.body.content,
      tags: req.body.tags.split(', '), // this means to search you need a space in your field
    },
    {
      new: true,
    }
  );
  res.redirect("/Data");
});

// delete a post
app.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  await PostModel.findOneAndDelete({ _id: id });
});

// catch all
app.get("/*", (req, res) => {
  res.sendFile(staticDir + "/index.html");
});

app.listen(port, () => {
  console.log("server is running");
});
