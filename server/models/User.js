const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your firstName"],
    maxlength: [30, "Your name cannot exceed 30 characters"],
    minlength: [4, "Your name shold have more than 4 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your lastName"],
    maxlength: [30, "Your name cannot exceed 30 characters"],
    minlength: [4, "Your name shold have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please add a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [4, "Your password must be at least 4 characters long"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
