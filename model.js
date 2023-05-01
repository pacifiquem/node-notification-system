const mongoose = require("mongoose");

// connect to MongoDB
mongoose.connect("mongodb://localhost/notification_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define the data models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  notifications: [
    {
      type: String,
      message: String,
      read: Boolean,
      date: { type: Date, default: Date.now },
    },
  ],
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Post };
