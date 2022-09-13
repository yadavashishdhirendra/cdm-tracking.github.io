const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientname: {
    type: String,
    required: true,
  },
  clienttype: {
    type: String,
    required: true,
  },
  clientemail: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
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

module.exports = mongoose.model("client", clientSchema);
