const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// HASHING PASSWORD WHILE REGISTERING
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// GENERATING TOKEN WHEN LOGIN
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET
  );
};

// COMPARING PASSWORD WHEN LOGIN
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
