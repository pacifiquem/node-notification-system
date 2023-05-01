const User = require("./model");
const Post = require("./model");
const Like = require("./model");
const Comment = require("./model");

module.exports = function (server) {
  const io = require("socket.io")(server);

  // listen for socket connections
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // listen for notifications for a specific user
    socket.on("notifications", async (userId) => {
      console.log("Notifications requested for user:", userId);
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found:", userId);
        return;
      }
      socket.join(`user-${userId}`);
    });

    // emit notifications to a specific user
    const emitNotifications = async (userId) => {
      const user = await User.findById(userId).populate("notifications");
      if (!user) {
        console.log("User not found:", userId);
        return;
      }
      const notifications = user.notifications.filter(
        (notification) => !notification.read
      );
      socket.to(`user-${userId}`).emit("notifications", notifications);
    };

    // listen for changes to posts
    const postChangeStream = Post.watch();
    postChangeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const post = change.fullDocument;
        emitNotifications(post.author.toString());
      }
    });

    // listen for changes to likes
    const likeChangeStream = Like.watch();
    likeChangeStream.on("change", async (change) => {
      if (change.operationType === "insert") {
        const like = change.fullDocument;
        const post = await Post.findById(like.post);
        emitNotifications(post.author.toString());
      }
    });

    // listen for changes to comments
    const commentChangeStream = Comment.watch();
    commentChangeStream.on("change", async (change) => {
      if (change.operationType === "insert") {
        const comment = change.fullDocument;
        const post = await Post.findById(comment.post);
        emitNotifications(post.author.toString());
        const commentedUser = await User.findById(comment.author);
        if (commentedUser._id.toString() !== post.author.toString()) {
          emitNotifications(commentedUser._id.toString());
        }
      }
    });
  });
};
