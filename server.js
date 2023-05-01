const express = require("express");
const http = require("http");
const cors = require("cors");
const router = require("./routes");
const notification = require("./notification");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// enable CORS
app.use(cors());

// use the router for API routes
app.use("/api", router);

// call the notification setup function and pass the server instance
notification(server);

server.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});
