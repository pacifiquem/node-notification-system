const { User, Post } = require("./model");

// get all users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
}

// create a new user
async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
}

// get a user by ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
}

// create a new post
async function createPost(req, res) {
  try {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    await post.save();
    res.json(post);
  } catch (error) {
    throw new Error(error);
  }
}

// add a like to a post
async function addLike(req, res) {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post || !user) {
      return res.status(404).json({ error: "Post or user not found" });
    }
    post.likes.push(user);
    await post.save();
    res.json(post);
  } catch (error) {
    throw new Error(error);
  }
}

// add a comment to a post
async function addComment(req, res) {
  try {
    const { postId, userId, content } = req.body;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post || !user) {
      return res.status(404).json({ error: "Post oruser not found" });
    }
    post.comments.push({ author: user, content });
    await post.save();

    // create notifications for users who liked or commented on the post
    const notifications = [];
    for (const userId of post.likes) {
      if (userId.toString() !== user._id.toString()) {
        const notification = {
          type: "like",
          message: `${user.name} liked your post "${post.title}`,
          read: false,
        };
        notifications.push(notification);
        const likedUser = await User.findById(userId);
        likedUser.notifications.push(notification);
        await likedUser.save();
      }
    }
    for (const comment of post.comments) {
      if (comment.author._id.toString() !== user._id.toString()) {
        const notification = {
          type: "comment",
          message: `${user.name} commented on your post "${post.title}`,
          read: false,
        };
        notifications.push(notification);
        const commentedUser = await User.findById(comment.author);
        commentedUser.notifications.push(notification);
        await commentedUser.save();
      }
    }

    res.json(post);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  createPost,
  addLike,
  addComment,
};
