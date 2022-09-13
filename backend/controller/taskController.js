const Client = require("../schema/clientSchema");
const Task = require("../schema/taskSchema");
const User = require("../schema/userSchema");
const moment = require("moment");

exports.createTask = async (req, res) => {
  try {
    const { taskname, priority, startdate, enddate, email, reporter } =
      req.body;

    if (!taskname || !priority || !email || !reporter) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields!",
      });
    }

    let task = await Task.create({
      taskname,
      priority,
      email,
      reporter,
      startdate,
      enddate,
      owner: req.user.id,
    });

    const client = await Client.findById(req.body.id);
    const user = await User.findOne({ email: email });

    client.tasks.push(task._id);
    user.task.push(task._id);
    await user.save();
    await client.save();
    await task.save();

    return res.status(200).json({
      success: true,
      task,
      message: "Task Created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.AddCommentInTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    task.comments.push({ user: req.user._id, comment: req.body.comment });

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Comment Added Success!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const update = { status: req.body.status };
    let task = await Task.findByIdAndUpdate(req.params.id, update, {
      runValidators: false,
      new: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      message: "Status Updated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProductiveStart = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }
    task.productiveStart.push({
      starttime: req.body.starttime,
    });

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Time Captured!",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProductiveEnd = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }
    task.productiveEnd.push({
      endtime: req.body.endtime,
    });

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Time Captured!",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductiveHours = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    let starttime = [];
    let endtime = [];

    task &&
      task.productiveStart.forEach((start) => {
        starttime.push(start);
      });

    task &&
      task.productiveEnd.forEach((end) => {
        endtime.push(end);
      });

    return res.status(200).json({
      success: true,
      starttime,
      endtime,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDelayedTask = async (req, res) => {
  try {
    let date = moment().format("DD/MM/YYYY");
    let task = await Task.find({
      enddate: {
        $lt: date,
      },
      owner: req.user._id,
    });
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.minutesScorePerTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    task.minutes.push({
      minute: req.body.minute,
      hour: req.body.hour,
    });

    await task.save();
    return res.status(200).json({
      success: true,
      task,
      message: "Minutes Stored",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
