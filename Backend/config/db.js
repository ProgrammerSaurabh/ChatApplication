const mongoose = require("mongoose");

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MongoDB URI is required");
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  console.log("MongoDB connected");
};

module.exports = connectDb;
