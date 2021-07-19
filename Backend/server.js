require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

connectDB();

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chats");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
