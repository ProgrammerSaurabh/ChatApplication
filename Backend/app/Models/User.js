const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide unique username"],
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async (next) => {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async (password) => {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", UserSchema);
