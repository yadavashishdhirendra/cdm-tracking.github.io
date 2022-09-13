const mongoose = require("mongoose");
const moment = require("moment");

let date = moment(new Date()).format("DD/MM/YYYY");

const taskSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reporter: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "Todo",
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  productiveStart: [
    {
      starttime: {
        type: String,
      },
      date: {
        type: String,
        default: date,
      },
    },
  ],
  productiveEnd: [
    {
      endtime: {
        type: String,
      },
      date: {
        type: String,
        default: date,
      },
    },
  ],
  minutes: [
    {
      minute: {
        type: Number,
      },
      hour: {
        type: Number,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("task", taskSchema);
